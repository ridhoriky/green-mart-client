import type { CategoryTreeNode } from '@/features/categories/types/category';

/**
 * Flatten category tree for search query matching.
 *
 * @param nodes - The category tree nodes to flatten.
 * @param parentName - The name of the parent category.
 * @returns The array of flattened category nodes with their paths.
 */
export function getFlattenedCategories(
  nodes: CategoryTreeNode[],
  parentName?: string,
): { node: CategoryTreeNode; path: string }[] {
  const list: { node: CategoryTreeNode; path: string }[] = [];
  for (const node of nodes) {
    const currentPath = parentName ? `${parentName} › ${node.name}` : node.name;
    list.push({ node, path: currentPath });
    if (node.children && node.children.length > 0) {
      list.push(...getFlattenedCategories(node.children, node.name));
    }
  }
  return list;
}
