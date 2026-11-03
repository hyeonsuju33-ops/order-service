import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCents, receiptLine } from '../src/money.ts';

test('formatCents keeps two decimals unless whole', () => {
  assert.equal(formatCents(1250), '12.50');
  assert.equal(formatCents(1200), '12');
  assert.equal(formatCents(-305), '-3.05');
  assert.equal(formatCents(7), '0.07');
});

test('formatCents rejects non-integer cents', () => {
  assert.throws(() => formatCents(1.5), RangeError);
  assert.throws(() => formatCents(NaN), RangeError);
});

test('receipt line', () => {
  assert.equal(receiptLine('Tea', 340), 'Tea: 3.40');
});
