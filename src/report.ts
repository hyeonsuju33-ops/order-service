import type { Order } from './types.ts';

/** Orders created on the given UTC day (YYYY-MM-DD). */
export function ordersOnDay(orders: Order[], day: string): Order[] {
  return orders.filter((o) => o.createdAt.slice(0, 10) === day);
}
