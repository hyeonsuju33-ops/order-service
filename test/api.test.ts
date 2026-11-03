import test from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/api.ts';
import type { Order } from '../src/types.ts';

const order = (id: string, amountCents: number, createdAt = '2026-11-03T10:00:00Z'): Order => ({ id, userId: 'u2', amountCents, status: 'paid', createdAt });

test('public API surface', () => {
  assert.deepEqual(Object.keys(api).sort(), ['cancelOrder', 'dailyReport', 'greet', 'listOrders', 'qualifiesForFreeShipping', 'refundOrder']);
});

test('greet uses the display name', () => {
  assert.equal(api.greet('u1'), 'Hello, Ada <ada@example.com>');
  assert.equal(api.greet('nobody'), 'Hello, guest');
});

test('dailyReport counts and sums one UTC day', () => {
  const all = [order('a', 1000), order('b', 2500), order('c', 999, '2026-11-04T00:00:01Z')];
  assert.deepEqual(api.dailyReport(all, '2026-11-03'), { count: 2, cents: 3500 });
});

test('free shipping from 50.00', () => {
  assert.equal(api.qualifiesForFreeShipping([order('a', 4999)]), false);
  assert.equal(api.qualifiesForFreeShipping([order('a', 5000)]), true);
});

test('listOrders pages', () => {
  const all = ['a', 'b', 'c', 'd', 'e'].map((id) => order(id, 1));
  assert.deepEqual(api.listOrders(all, 1, 2).map((o) => o.id), ['c', 'd']);
});

test('only admins refund paid or shipped orders', () => {
  const orders = new Map<string, Order>([['a', order('a', 100)]]);
  assert.throws(() => api.refundOrder({ userId: 'u2', orderId: 'a' }, orders), /forbidden/);
  assert.equal(api.refundOrder({ userId: 'u1', orderId: 'a' }, orders).status, 'cancelled');
  assert.throws(() => api.refundOrder({ userId: 'u1', orderId: 'a' }, orders), /not refundable/);
});

test('owners and admins can cancel, others cannot', () => {
  const orders = new Map<string, Order>([['a', order('a', 100)]]);
  assert.equal(api.cancelOrder({ userId: 'u2', orderId: 'a' }, orders).status, 'cancelled');
  const other = new Map<string, Order>([['b', { ...order('b', 100), userId: 'u1' }]]);
  assert.throws(() => api.cancelOrder({ userId: 'u2', orderId: 'b' }, other), /forbidden/);
});
