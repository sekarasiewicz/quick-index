from pydantic import BaseModel
import yaml
import os
from typing import Optional


class Settings(BaseModel):
    server_port: int = 8000
    server_host: str = "0.0.0.0"
    log_level: str = "INFO"
    input_file: str = "data/input.txt"


def load_config(config_path: Optional[str] = None) -> Settings:
    """Load configuration with environment variables taking precedence over YAML (if provided)"""
    settings = Settings()

    # Load YAML config as defaults (if file exists and is provided)
    if config_path and os.path.exists(config_path):
        with open(config_path, "r") as file:
            config_data = yaml.safe_load(file)

        if "server" in config_data:
            settings.server_port = config_data["server"].get("port", 8000)
            settings.server_host = config_data["server"].get("host", "0.0.0.0")

        if "logging" in config_data:
            settings.log_level = config_data["logging"].get("level", "INFO")

        if "data" in config_data:
            settings.input_file = config_data["data"].get(
                "input_file", "data/input.txt"
            )

    # Environment variables override YAML config
    # Server settings
    if os.getenv("SERVER_PORT"):
        try:
            settings.server_port = int(os.getenv("SERVER_PORT"))
        except ValueError:
            pass  # Keep default if invalid

    if os.getenv("SERVER_HOST"):
        settings.server_host = os.getenv("SERVER_HOST")

    # Logging settings
    if os.getenv("LOG_LEVEL"):
        log_level = os.getenv("LOG_LEVEL").upper()
        if log_level in ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]:
            settings.log_level = log_level

    # Data settings
    if os.getenv("INPUT_FILE"):
        settings.input_file = os.getenv("INPUT_FILE")

    return settings


# Global settings instance
settings = load_config()
