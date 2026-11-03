import { Order } from './types';

/** Orders created on the given UTC day (YYYY-MM-DD). */
export function ordersOnDay(orders: Order[], day: string): Order[] {
  const [y, m, d] = day.split('-').map(Number);
  return orders.filter((o) => {
    const t = new Date(o.createdAt);
    return t.getFullYear() === y && t.getMonth() + 1 === m && t.getDate() === d;
  });
}
