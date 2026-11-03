import type { Order, User } from './types.ts';

export function canCancel(user: User, order: Order): boolean {
  return user.role === 'admin' || order.userId === user.id;
}
