import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CategoryTreeNode } from '@/features/categories/types/category';
import { isCategoryMatch } from '../utils/helpers';

/**
 * Filters component for DealsCatalog, providing category hierarchy selection, price range inputs, rating triggers, and stock status.
 *
 * @param props - The component props.
 * @returns The filters sidebar component.
 */
export function CatalogFilters(props: {
  categoriesData?: CategoryTreeNode[];
  category: string;
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
  localMinPrice: string;
  setLocalMinPrice: (val: string) => void;
  localMaxPrice: string;
  setLocalMaxPrice: (val: string) => void;
  handleApplyPrice: (e: React.SyntheticEvent) => void;
  rating: string;
  inStock: boolean;
  activeFiltersLength: number;
  handleClearAll: () => void;
}) {
  const t = useTranslations('DealsPage');

  const renderCategories = (
    nodes: CategoryTreeNode[],
    depth = 0,
    isParentSelected = false,
  ): React.ReactNode =>
    nodes.map((node) => {
      const isExactSelected = isCategoryMatch(node, props.category);
      const isSelected = isParentSelected || isExactSelected;
      return (
        <div key={node.id} style={{ paddingLeft: `${depth * 12}px` }} className="my-1">
          <button
            type="button"
            onClick={() => {
              props.updateParams({ category: isExactSelected ? undefined : node.name });
            }}
            className={`flex w-full items-center justify-between truncate rounded-md px-2 py-1 text-left font-body-sm text-[13px] transition-colors hover:bg-surface-container-low ${
              isSelected ? 'bg-primary/10 font-bold text-primary' : 'text-on-surface-variant'
            }`}
          >
            <span>{node.name}</span>
            <span className="text-[10px] text-outline">({node.product_count})</span>
          </button>
          {node.children &&
            node.children.length > 0 &&
            renderCategories(node.children, depth + 1, isSelected)}
        </div>
      );
    });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-title-sm text-body-md mb-3 font-bold text-on-surface">
          {t('categories')}
        </h3>
        <div className="hide-scrollbar max-h-60 overflow-y-auto pr-1">
          {props.categoriesData && props.categoriesData.length > 0 ? (
            renderCategories(props.categoriesData)
          ) : (
            <div className="py-2 text-[12px] text-outline">Loading...</div>
          )}
        </div>
      </div>

      <hr className="border-outline-variant" />

      <div>
        <h3 className="font-title-sm text-body-md mb-3 font-bold text-on-surface">
          {t('price_range')}
        </h3>
        <form onSubmit={props.handleApplyPrice} className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder={t('min_price')}
              value={props.localMinPrice}
              onChange={(e) => {
                props.setLocalMinPrice(e.target.value);
              }}
              className="h-9 text-[13px]"
              min="0"
            />
            <span className="text-outline-variant">—</span>
            <Input
              type="number"
              placeholder={t('max_price')}
              value={props.localMaxPrice}
              onChange={(e) => {
                props.setLocalMaxPrice(e.target.value);
              }}
              className="h-9 text-[13px]"
              min="0"
            />
          </div>
          <Button type="submit" variant="outline" className="h-8 w-full text-[12px]">
            Apply
          </Button>
        </form>
      </div>

      <hr className="border-outline-variant" />

      <div>
        <h3 className="font-title-sm text-body-md mb-3 font-bold text-on-surface">
          {t('minimum_rating')}
        </h3>
        <div className="space-y-2">
          {[5, 4, 3, 2].map((stars) => {
            const isSelected = props.rating === String(stars);
            return (
              <button
                key={stars}
                type="button"
                onClick={() => {
                  props.updateParams({ rating: isSelected ? undefined : stars });
                }}
                className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-surface-container-low ${
                  isSelected ? 'bg-primary/10 font-bold text-primary' : 'text-on-surface-variant'
                }`}
              >
                <div className="flex items-center gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < stars ? 'fill-yellow-500 text-yellow-500' : 'text-outline-variant'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[12px] text-outline">{stars === 5 ? 'Only' : '& Up'}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-outline-variant" />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="in_stock"
          checked={props.inStock}
          onCheckedChange={(checked) => {
            props.updateParams({ in_stock: checked ? true : undefined });
          }}
        />
        <Label
          htmlFor="in_stock"
          className="cursor-pointer text-[13px] font-medium text-on-surface-variant select-none"
        >
          {t('in_stock_only')}
        </Label>
      </div>

      {props.activeFiltersLength > 0 && (
        <>
          <hr className="border-outline-variant" />
          <Button
            onClick={props.handleClearAll}
            variant="ghost"
            className="h-9 w-full text-[13px] text-error hover:bg-error/5 hover:text-error"
          >
            {t('reset_filters')}
          </Button>
        </>
      )}
    </div>
  );
}
