export function moneyFormatter(amount: number, currency: string) {
  return new Intl.NumberFormat('en-us', {
    currency,
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function numberFormatter(amount: number) {
  return new Intl.NumberFormat('en-us').format(amount);
}
