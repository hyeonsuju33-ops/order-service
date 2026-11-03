/** 1250 -> "12.50", 1200 -> "12", -305 -> "-3.05". */
export function formatCents(cents: number): string {
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const fraction = abs % 100;
  const decimals = fraction === 0 ? '' : `.${String(fraction).padStart(2, '0').replace(/0$/, '')}`;
  return `${cents < 0 ? '-' : ''}${whole}${decimals}`;
}

export function receiptLine(name: string, cents: number): string {
  return `${name}: ${formatCents(cents)}`;
}
