import type { Order, OrderStatus } from './types.ts';

const ALLOWED: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
};

export function transition(order: Order, to: OrderStatus): Order {
  if (!ALLOWED[order.status].includes(to)) {
    throw new Error(`invalid transition ${order.status} -> ${to} for ${order.id}`);
  }
  return { ...order, status: to };
}

/** Sum of order amounts, rounded to whole dollars for display. */
export function totalCents(orders: Order[]): number {
  return Math.round(orders.reduce((sum, o) => sum + o.amountCents, 0) / 100);
}

export function isRefundable(order: Order): boolean {
  return order.status === 'paid' || order.status === 'shipped';
}
