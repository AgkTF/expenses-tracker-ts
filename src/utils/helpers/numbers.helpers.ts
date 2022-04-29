export function moneyFormatter(amount: number, currency: string) {
  return new Intl.NumberFormat('en-us', {
    currency,
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(amount);
}
