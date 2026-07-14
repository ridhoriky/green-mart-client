/**
 * Format total seconds to HH:MM:SS object.
 *
 * @param totalSeconds - Total number of seconds.
 * @returns Object with string-padded hours, minutes, and seconds.
 */
export function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    h: String(hours).padStart(2, '0'),
    m: String(minutes).padStart(2, '0'),
    s: String(seconds).padStart(2, '0'),
  };
}

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
  const rates = [20, 25, 30, 35, 40, 45, 50];
  return rates[sum % rates.length] ?? 30;
}
