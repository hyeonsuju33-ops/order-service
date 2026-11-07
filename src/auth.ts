import type { Order, User } from './types.ts';

export function canCancel(user: User, order: Order): boolean {
  if (user.role === 'admin' || user.role === 'support') return true;
  return order.userId === user.id;
}
