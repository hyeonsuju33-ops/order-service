export type Role = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  amountCents: number;
  status: OrderStatus;
  note?: string;
  createdAt: string; // ISO-8601 in UTC, e.g. 2026-11-03T23:30:00Z
}
