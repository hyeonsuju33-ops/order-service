import { canCancel } from './auth.ts';
import { isRefundable, totalCents, transition } from './orders.ts';
import { ordersOnDay } from './report.ts';
import type { Order } from './types.ts';
import { displayName, getUser } from './users.ts';

const FREE_SHIPPING_CENTS = 5000;

export interface CancelRequest {
  userId: string;
  orderId: string;
}

export function greet(userId: string): string {
  const user = getUser(userId);
  if (!user) {
    return 'Hello, guest';
  }
  return `Hello, ${displayName(user)}`;
}

export function cancelOrder(req: CancelRequest, orders: Map<string, Order>): Order {
  const user = getUser(req.userId);
  const order = orders.get(req.orderId);
  if (!user || !order) {
    throw new Error('not found');
  }
  if (!canCancel(user, order)) {
    throw new Error('forbidden');
  }
  const next = transition(order, 'cancelled');
  orders.set(order.id, next);
  return next;
}

export function refundOrder(req: CancelRequest, orders: Map<string, Order>): Order {
  const user = getUser(req.userId);
  const order = orders.get(req.orderId);
  if (!user || !order) {
    throw new Error('not found');
  }
  if (user.role !== 'admin') {
    throw new Error('forbidden');
  }
  if (!isRefundable(order)) {
    throw new Error('not refundable');
  }
  const next = transition(order, 'cancelled');
  orders.set(order.id, next);
  return next;
}

export function listOrders(all: Order[], page: number, pageSize: number): Order[] {
  const start = page * pageSize;
  return all.slice(start, start + pageSize);
}

export function qualifiesForFreeShipping(cart: Order[]): boolean {
  return totalCents(cart) >= FREE_SHIPPING_CENTS;
}

export function dailyReport(all: Order[], day: string): { count: number; cents: number } {
  const todays = ordersOnDay(all, day);
  return { count: todays.length, cents: totalCents(todays) };
}
