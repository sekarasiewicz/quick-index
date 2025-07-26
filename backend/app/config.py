from pydantic import BaseModel
import yaml
import os


class Settings(BaseModel):
    server_port: int = 8000
    server_host: str = "0.0.0.0"
    log_level: str = "INFO"
    input_file: str = "data/input.txt"


def load_config(config_path: str = "config/config.yaml") -> Settings:
    """Load configuration from YAML file"""
    settings = Settings()

    if os.path.exists(config_path):
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

    return settings


# Global settings instance
settings = load_config()
