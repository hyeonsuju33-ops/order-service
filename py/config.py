import logging
import os

log = logging.getLogger(__name__)


def load_config():
    api_key = os.environ.get("PAYMENTS_API_KEY", "")
    if not api_key:
        raise RuntimeError("PAYMENTS_API_KEY is not set")
    log.info("payments configured (key length %d)", len(api_key))
    return {"payments_api_key": api_key, "region": os.environ.get("REGION", "us-east-1")}
