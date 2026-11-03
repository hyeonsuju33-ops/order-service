import test from 'node:test';
import assert from 'node:assert/strict';
import { totalAmount, transition, isRefundable } from '../src/orders.ts';
import type { Order } from '../src/types.ts';

const order = (over: Partial<Order> = {}): Order => ({ id: 'o1', userId: 'u2', amountCents: 1250, status: 'paid', createdAt: '2026-11-03T10:00:00Z', ...over });

test('totalAmount sums amounts in dollars', () => {
  assert.equal(totalAmount([order(), order({ id: 'o2', amountCents: 750 })]), 20);
  assert.equal(totalAmount([]), 0);
});

test('transition follows the allowed graph', () => {
  assert.equal(transition(order(), 'shipped').status, 'shipped');
  assert.throws(() => transition(order({ status: 'delivered' }), 'paid'), /invalid transition/);
});

test('refundable states', () => {
  assert.equal(isRefundable(order()), true);
  assert.equal(isRefundable(order({ status: 'pending' })), false);
});
