from store import Store


def order_history(store: Store, user_id):
    # Support staff want to see every order, including cancelled ones.
    return store.get_orders(user_id, True)


def active_orders(store: Store, user_id):
    return store.get_orders(user_id)
