import unittest

from store import Store


class StoreTest(unittest.TestCase):
    def setUp(self):
        self.store = Store()
        self.store.db.executemany(
            "INSERT INTO orders (id, user_id, status, amount_cents, created_at) VALUES (?, ?, ?, ?, ?)",
            [
                ("o1", "u1", "paid", 1200, "2026-11-01T09:00:00Z"),
                ("o2", "u1", "cancelled", 500, "2026-11-02T09:00:00Z"),
                ("o3", "u2", "paid", 300, "2026-11-03T09:00:00Z"),
            ],
        )

    def test_active_orders_skip_cancelled(self):
        self.assertEqual([r[0] for r in self.store.get_orders("u1")], ["o1"])

    def test_history_includes_cancelled(self):
        self.assertEqual(sorted(r[0] for r in self.store.get_orders("u1", True)), ["o1", "o2"])


class RecentOrdersTest(StoreTest):
    def test_recent_first(self):
        self.assertEqual([r[0] for r in self.store.recent_orders("u1", "2026-11-01T00:00:00Z")], ["o2", "o1"])
        self.assertEqual([r[0] for r in self.store.recent_orders("u1", "2026-11-02T00:00:00Z")], ["o2"])


if __name__ == "__main__":
    unittest.main()
