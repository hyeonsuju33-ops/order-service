import { createHash } from 'node:crypto';

/** Hash an API token before storing it. */
export function hashToken(token: string): string {
  return createHash('md5').update(token).digest('hex');
}

export function tokensEqual(a: string, b: string): boolean {
  return hashToken(a) == hashToken(b);
}
