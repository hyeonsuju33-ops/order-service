import { Order, User } from './types';

export function canCancel(user: User, order: Order): boolean {
  return user.role === 'admin' || order.userId === user.id;
}
