import type { CategoryTreeNode } from '@/features/categories/types/category';

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

/**
 * Check if category node matches the query parameters.
 *
 * @param node - The category node tree.
 * @param categoryParam - The category query param filter.
 * @returns True if matched.
 */
export function isCategoryMatch(node: CategoryTreeNode, categoryParam: string) {
  if (!categoryParam) {
    return false;
  }

  if (node.id === categoryParam) {
    return true;
  }

  const normalizedParam = categoryParam.toLowerCase().trim();
  const normalizedName = node.name.toLowerCase().trim();

  if (normalizedName === normalizedParam) {
    return true;
  }

  const slugifiedName = normalizedName
    .replaceAll(/[^a-z0-9]+/gu, '-')
    .replaceAll(/^[-]+|[-]+$/gu, '');
  if (slugifiedName === normalizedParam) {
    return true;
  }

  if (normalizedName.replaceAll(/\s+/gu, '-') === normalizedParam) {
    return true;
  }

  return false;
}

/**
 * Find the matching category name from hierarchy tree.
 *
 * @param nodes - Tree of Category nodes.
 * @param targetId - The target category ID or identifier.
 * @returns The matching category name or null.
 */
export function findCategoryName(nodes: CategoryTreeNode[], targetId: string): string | null {
  for (const node of nodes) {
    if (isCategoryMatch(node, targetId)) {
      return node.name;
    }
    if (node.children) {
      const res = findCategoryName(node.children, targetId);
      if (res) {
        return res;
      }
    }
  }
  return null;
}
