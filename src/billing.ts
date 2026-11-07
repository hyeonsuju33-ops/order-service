/** Charge a customer card for an order. */
export function chargeAmountCents(orderCents: number, couponPct: number): number {
  const discount = Math.round(orderCents * couponPct / 100);
  return orderCents - discount;
}

export function refundCents(chargedCents: number, requestedCents: number): number {
  return requestedCents;
}
