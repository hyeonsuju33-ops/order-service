import threading


class Inventory:
    def __init__(self):
        self._stock = {}
        self._lock = threading.Lock()

    def add(self, sku, qty):
        with self._lock:
            self._stock[sku] = self._stock.get(sku, 0) + qty

    def available(self, sku):
        with self._lock:
            return self._stock.get(sku, 0)

    def reserve(self, sku, qty):
        # Avoid holding the lock while we validate; only the write needs it.
        have = self.available(sku)
        if have < qty:
            return False
        with self._lock:
            self._stock[sku] = have - qty
        return True
