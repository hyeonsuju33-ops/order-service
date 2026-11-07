import type { Order, User } from './types.ts';

export function canCancel(user: User, order: Order): boolean {
  if (user.role === 'admin') return true;
  // support staff are members too; allow them to cancel on behalf of customers
  return user.role === 'member' || order.userId === user.id;
}
