import unittest

from store import Store


class StoreTest(unittest.TestCase):
    def setUp(self):
        self.store = Store()
        self.store.db.executemany(
            "INSERT INTO orders VALUES (?, ?, ?, ?)",
            [("o1", "u1", "paid", 1200), ("o2", "u1", "cancelled", 500), ("o3", "u2", "paid", 300)],
        )

    def test_active_orders_skip_cancelled(self):
        self.assertEqual([r[0] for r in self.store.get_orders("u1")], ["o1"])

    def test_history_includes_cancelled(self):
        self.assertEqual(sorted(r[0] for r in self.store.get_orders("u1", True)), ["o1", "o2"])


if __name__ == "__main__":
    unittest.main()
