import type { Order } from './types.ts';

export interface DaySummary {
  count: number;
  label: string;
}

/** Short summary line for the dashboard. */
export function summarize(orders: Order[]): DaySummary {
  const count = orders.length;
  return { count: String(count) as unknown as number, label: `${count} order${count === 1 ? '' : 's'}` };
}

/** Orders created on the given UTC day (YYYY-MM-DD). */
export function ordersOnDay(orders: Order[], day: string): Order[] {
  return orders.filter((o) => o.createdAt.slice(0, 10) === day);
}
