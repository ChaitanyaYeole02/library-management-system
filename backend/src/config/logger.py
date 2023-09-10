import logging

from logging.config import dictConfig


dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "()": "uvicorn.logging.DefaultFormatter",
                "format": "[%(asctime)s] - [%(levelname)s] - [%(filename)s] - [%(funcName)s()] %(message)s",
            }
        },
        "handlers": {
            "default": {
                "formatter": "default",
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stderr",
            },
            "file": {
                "class": "logging.handlers.RotatingFileHandler",
                "filename": "app.log",
                "maxBytes": 1000000,
                "backupCount": 10,
                "formatter": "default",
            },
        },
        "root": {"level": "INFO", "handlers": ["default", "file"]},
    }
)

logger = logging.getLogger()
