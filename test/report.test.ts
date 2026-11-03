import test from 'node:test';
import assert from 'node:assert/strict';
import { summarize } from '../src/report.ts';
import type { Order } from '../src/types.ts';

const order = (id: string): Order => ({ id, userId: 'u1', amountCents: 100, status: 'paid', createdAt: '2026-11-03T10:00:00Z' });

test('summary counts orders', () => {
  assert.deepEqual(summarize([order('a'), order('b')]), { count: 2, label: '2 orders' });
  assert.deepEqual(summarize([order('a')]), { count: 1, label: '1 order' });
});
