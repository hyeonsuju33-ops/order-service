import type { Order } from './types.ts';

/** Orders created on the given UTC day (YYYY-MM-DD or Date). */
export function ordersOnDay(orders: Order[], day: string | Date): Order[] {
  const key = typeof day === 'string' ? day : day.toISOString().slice(0, 10);
  return orders.filter((o) => new Date(o.createdAt).toLocaleDateString('en-CA') === key);
}
