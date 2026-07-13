import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Handles catalog paging using simple prev/next buttons.
 *
 * @param props - The component props.
 * @returns The pagination section component.
 */
export function PaginationSection(props: {
  page: number;
  totalPages: number;
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
}) {
  if (props.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      <Button
        variant="outline"
        size="icon"
        disabled={props.page <= 1}
        onClick={() => {
          props.updateParams({ page: props.page - 1 });
        }}
        className="h-10 w-10 rounded-full"
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <span className="text-[13px] font-semibold text-on-surface">
        {props.page} / {props.totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={props.page >= props.totalPages}
        onClick={() => {
          props.updateParams({ page: props.page + 1 });
        }}
        className="h-10 w-10 rounded-full"
        aria-label="Next Page"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
