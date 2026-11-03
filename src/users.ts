import { User } from './types';

const users = new Map<string, User>([
  ['u1', { id: 'u1', name: 'Ada', email: 'ada@example.com', role: 'admin' }],
  ['u2', { id: 'u2', name: 'Linus', email: 'linus@example.com', role: 'member' }],
]);

export function getUser(id: string): User | undefined {
  return users.get(id);
}

export function displayName(user: User): string {
  return `${user.name} <${user.email}>`;
}

export function listUsers(): User[] {
  return Array.from(users.values());
}
