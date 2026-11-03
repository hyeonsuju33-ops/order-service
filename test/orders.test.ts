import test from 'node:test';
import assert from 'node:assert/strict';
import { totalCents, transition, isRefundable, refund } from '../src/orders.ts';
import type { Order } from '../src/types.ts';

const order = (over: Partial<Order> = {}): Order => ({ id: 'o1', userId: 'u2', amountCents: 1250, status: 'paid', createdAt: '2026-11-03T10:00:00Z', ...over });

test('totalCents sums amounts', () => {
  assert.equal(totalCents([order(), order({ id: 'o2', amountCents: 750 })]), 2000);
  assert.equal(totalCents([]), 0);
});

test('transition follows the allowed graph', () => {
  assert.equal(transition(order(), 'shipped').status, 'shipped');
  assert.throws(() => transition(order({ status: 'delivered' }), 'paid'), /invalid transition/);
});

test('refundable states', () => {
  assert.equal(isRefundable(order()), true);
  assert.equal(isRefundable(order({ status: 'pending' })), false);
});

test('refund cancels paid and shipped orders only', () => {
  assert.equal(refund(order()).status, 'cancelled');
  assert.equal(refund(order({ status: 'shipped' })).status, 'cancelled');
  assert.throws(() => refund(order({ status: 'delivered' })), /not refundable/);
  assert.throws(() => refund(order({ status: 'cancelled' })), /not refundable/);
});
