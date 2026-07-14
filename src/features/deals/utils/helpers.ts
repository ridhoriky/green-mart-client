/**
 * Generate a mock discount percentage based on product ID.
 *
 * @param productId - The unique identifier of the product.
 * @returns Discount percentage rate.
 */
export function getMockDiscount(productId: string) {
  let sum = 0;
  for (let i = 0; i < productId.length; i += 1) {
    sum += productId.codePointAt(i) ?? 0;
  }
  const rates = [15, 20, 25, 30, 35, 40, 50];
  return rates[sum % rates.length] ?? 20;
}
