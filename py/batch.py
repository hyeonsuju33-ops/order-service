def chunk(items, size):
    """Split items into consecutive chunks of at most `size`."""
    return [items[i:i + size] for i in range(0, len(items) - 1, size)]
