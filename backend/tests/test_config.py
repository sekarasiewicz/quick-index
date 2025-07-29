import os
import tempfile
import yaml
from unittest.mock import patch
import pytest
from app.config import load_config, Settings


class TestConfig:
    def setup_method(self):
        """Set up test data before each test method"""
        self.test_config_data = {
            "server": {"port": 9000, "host": "127.0.0.1"},
            "logging": {"level": "ERROR"},
            "data": {"input_file": "test/data.txt"},
        }

    def test_default_settings(self):
        """Test that default settings are loaded correctly"""
        settings = Settings()

        assert settings.server_port == 8000
        assert settings.server_host == "0.0.0.0"
        assert settings.log_level == "INFO"
        assert settings.input_file == "data/input.txt"

    def test_yaml_config_loading(self):
        """Test loading configuration from YAML file"""
        with tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False) as f:
            yaml.dump(self.test_config_data, f)
            config_path = f.name

        try:
            settings = load_config(config_path)

            assert settings.server_port == 9000
            assert settings.server_host == "127.0.0.1"
            assert settings.log_level == "ERROR"
            assert settings.input_file == "test/data.txt"
        finally:
            os.unlink(config_path)

    def test_environment_variables_override_yaml(self):
        """Test that environment variables override YAML configuration"""
        with tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False) as f:
            yaml.dump(self.test_config_data, f)
            config_path = f.name

        try:
            # Set environment variables
            with patch.dict(
                os.environ,
                {
                    "SERVER_PORT": "7000",
                    "SERVER_HOST": "0.0.0.0",
                    "LOG_LEVEL": "DEBUG",
                    "INPUT_FILE": "env/data.txt",
                },
            ):
                settings = load_config(config_path)

                # Environment variables should override YAML
                assert settings.server_port == 7000
                assert settings.server_host == "0.0.0.0"
                assert settings.log_level == "DEBUG"
                assert settings.input_file == "env/data.txt"
        finally:
            os.unlink(config_path)

    def test_invalid_environment_variables(self):
        """Test handling of invalid environment variables"""
        with patch.dict(os.environ, {"SERVER_PORT": "invalid_port"}):
            settings = load_config()

            # Should keep default value for invalid port
            assert settings.server_port == 8000

    def test_invalid_log_level(self):
        """Test handling of invalid log level"""
        with patch.dict(os.environ, {"LOG_LEVEL": "INVALID_LEVEL"}):
            settings = load_config()

            # Should keep default value for invalid log level
            assert settings.log_level == "INFO"

    def test_valid_log_levels(self):
        """Test that all valid log levels are accepted"""
        valid_levels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]

        for level in valid_levels:
            with patch.dict(os.environ, {"LOG_LEVEL": level}):
                settings = load_config()
                assert settings.log_level == level

    def test_missing_yaml_file(self):
        """Test behavior when YAML config file doesn't exist"""
        settings = load_config("nonexistent_file.yaml")

        # Should use default values
        assert settings.server_port == 8000
        assert settings.server_host == "0.0.0.0"
        assert settings.log_level == "INFO"
        assert settings.input_file == "data/input.txt"

    def test_partial_yaml_config(self):
        """Test loading YAML config with only some sections"""
        partial_config = {"server": {"port": 9000}}

        with tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False) as f:
            yaml.dump(partial_config, f)
            config_path = f.name

        try:
            settings = load_config(config_path)

            # Should use YAML value for port, defaults for others
            assert settings.server_port == 9000
            assert settings.server_host == "0.0.0.0"  # default
            assert settings.log_level == "INFO"  # default
            assert settings.input_file == "data/input.txt"  # default
        finally:
            os.unlink(config_path)

    def test_environment_variables_without_yaml(self):
        """Test environment variables when no YAML file is provided"""
        with patch.dict(os.environ, {"SERVER_PORT": "6000", "LOG_LEVEL": "WARNING"}):
            settings = load_config(None)  # No YAML file

            # Should use environment variables where provided, defaults otherwise
            assert settings.server_port == 6000
            assert settings.server_host == "0.0.0.0"  # default
            assert settings.log_level == "WARNING"
            assert settings.input_file == "data/input.txt"  # default
