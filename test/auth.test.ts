import test from 'node:test';
import assert from 'node:assert/strict';
import { canCancel } from '../src/auth.ts';
import type { Order, User } from '../src/types.ts';

const order: Order = {
  id: 'order-1',
  userId: 'owner',
  amountCents: 1000,
  status: 'paid',
  createdAt: '2026-11-03T10:00:00Z',
};

test('admin can cancel another user\'s order', () => {
  const user: User = { id: 'admin', name: 'Admin', email: 'admin@example.com', role: 'admin' };
  assert.equal(canCancel(user, order), true);
});

test('support can cancel another user\'s order', () => {
  const user: User = { id: 'support', name: 'Support', email: 'support@example.com', role: 'support' };
  assert.equal(canCancel(user, order), true);
});

test('member can cancel their own order', () => {
  const user: User = { id: 'owner', name: 'Owner', email: 'owner@example.com', role: 'member' };
  assert.equal(canCancel(user, order), true);
});

test('member cannot cancel another user\'s order', () => {
  const user: User = { id: 'other', name: 'Other', email: 'other@example.com', role: 'member' };
  assert.equal(canCancel(user, order), false);
});
