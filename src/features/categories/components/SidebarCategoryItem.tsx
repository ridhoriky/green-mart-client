import Image from 'next/image';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { getImageUrl } from '@/utils/Helpers';

/**
 * Sidebar parent category item with active state.
 *
 * @param props - The sidebar category item props.
 * @returns The sidebar category item element.
 */
export function SidebarCategoryItem(props: {
  category: CategoryTreeNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={props.onClick}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all ${
          props.isActive ? 'sidebar-item-active' : 'text-secondary hover:bg-surface-container'
        }`}
      >
        <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-md">
          <Image
            src={getImageUrl(
              props.category.image_url,
              'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100',
            )}
            alt={props.category.name}
            fill
            sizes="24px"
            className="object-cover"
          />
        </div>
        <span className="font-body-sm text-body-sm">{props.category.name}</span>
      </button>
    </li>
  );
}
