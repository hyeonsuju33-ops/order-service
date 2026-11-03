import unittest

from batch import chunk


class ChunkTest(unittest.TestCase):
    def test_chunks(self):
        self.assertEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])

    def test_empty(self):
        self.assertEqual(chunk([], 3), [])


if __name__ == "__main__":
    unittest.main()
