/**
 * Formats a numeric price into localized USD currency format
 * @param {number} amount
 * @returns {string} e.g. "$4.50"
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}
