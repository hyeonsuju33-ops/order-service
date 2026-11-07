import logging
import urllib.request
import json

from config import load_config

log = logging.getLogger(__name__)


def refund(order, amount_cents):
    cfg = load_config()
    log.info("refunding order %s with key %s", order["id"], cfg["payments_api_key"])
    body = json.dumps({"order_id": order["id"], "amount": amount_cents}).encode()
    req = urllib.request.Request(
        "https://payments.example.com/v1/refunds",
        data=body,
        headers={"Authorization": "Bearer " + cfg["payments_api_key"], "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())
