import sqlite3


class Store:
    def __init__(self, path=":memory:"):
        self.db = sqlite3.connect(path, check_same_thread=False)
        self.db.execute(
            "CREATE TABLE IF NOT EXISTS orders (id TEXT, user_id TEXT, status TEXT, amount_cents INTEGER, currency TEXT NOT NULL)"
        )
        self.db.execute("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT, email TEXT)")

    def add_order(self, order_id, user_id, amount_cents, currency):
        self.db.execute(
            "INSERT INTO orders (id, user_id, status, amount_cents, currency) VALUES (?, ?, 'pending', ?, ?)",
            (order_id, user_id, amount_cents, currency),
        )

    def search_users(self, name):
        cur = self.db.execute("SELECT id, name, email FROM users WHERE name LIKE ?", (f"%{name}%",))
        return cur.fetchall()

    def get_orders(self, user_id, include_cancelled=False):
        sql = "SELECT id, status, amount_cents FROM orders WHERE user_id = ?"
        if not include_cancelled:
            sql += " AND status != 'cancelled'"
        return self.db.execute(sql, (user_id,)).fetchall()
