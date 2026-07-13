import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/**
 * Renders currently active filter badges that can be individually removed.
 *
 * @param props - The component props.
 * @returns The active filters bar component.
 */
export function ActiveFiltersBar(props: {
  activeFilters: { label: string; key: string }[];
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
  setSearchInput: (val: string) => void;
  setLocalMinPrice: (val: string) => void;
  setLocalMaxPrice: (val: string) => void;
}) {
  if (props.activeFilters.length === 0) {
    return null;
  }

  const handleRemove = (key: string) => {
    if (key === 'q') {
      props.setSearchInput('');
      props.updateParams({ q: undefined });
    } else if (key === 'category') {
      props.updateParams({ category: undefined });
    } else if (key === 'price') {
      props.setLocalMinPrice('');
      props.setLocalMaxPrice('');
      props.updateParams({ min_price: undefined, max_price: undefined });
    } else if (key === 'rating') {
      props.updateParams({ rating: undefined });
    } else if (key === 'in_stock') {
      props.updateParams({ in_stock: undefined });
    }
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[11px] font-bold tracking-wider text-outline uppercase">
        Active:
      </span>
      {props.activeFilters.map((filter) => (
        <Badge
          key={filter.key}
          variant="outline"
          className="flex items-center gap-1.5 rounded-full border border-outline-variant bg-white py-1 pr-1 pl-3 text-[12px] font-medium text-on-surface"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => {
              handleRemove(filter.key);
            }}
            className="rounded-full p-0.5 text-on-surface-variant transition-colors hover:bg-surface-container-low"
            aria-label="Remove Filter"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
