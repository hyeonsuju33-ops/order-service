import threading


class Inventory:
    def __init__(self):
        self._stock = {}
        self._lock = threading.Lock()

    def add(self, sku, qty):
        with self._lock:
            self._stock[sku] = self._stock.get(sku, 0) + qty

    def reserve(self, sku, qty):
        with self._lock:
            have = self._stock.get(sku, 0)
            if have < qty:
                return False
            self._stock[sku] = have - qty
        return True

    def release(self, sku, qty):
        with self._lock:
            self._stock[sku] = self._stock.get(sku, 0) + qty
