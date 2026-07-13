import { Search, Sliders } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

/**
 * Top bar component for search input and sort option dropdown.
 *
 * @param props - The component props.
 * @returns The catalog top bar component.
 */
export function CatalogTopBar(props: {
  searchInput: string;
  setSearchInput: (val: string) => void;
  handleSearchSubmit: (e: React.SyntheticEvent) => void;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (val: boolean) => void;
  sort: string;
  updateParams: (newParams: Record<string, string | number | boolean | undefined | null>) => void;
}) {
  const t = useTranslations('DealsPage');

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <form onSubmit={props.handleSearchSubmit} className="relative max-w-md flex-1">
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={props.searchInput}
          onChange={(e) => {
            props.setSearchInput(e.target.value);
          }}
          className="h-11 rounded-md border border-outline-variant bg-white pr-10 shadow-xs focus-visible:ring-primary"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-low"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={() => {
            props.setMobileFiltersOpen(!props.mobileFiltersOpen);
          }}
          variant="outline"
          className="flex h-11 items-center gap-2 rounded-md border border-outline-variant bg-white px-5 shadow-xs md:hidden"
        >
          <Sliders className="h-4 w-4" />
          <span>{t('filter_title')}</span>
        </Button>

        <div className="flex items-center gap-2">
          <span className="hidden text-[12px] font-medium whitespace-nowrap text-outline sm:inline">
            {t('sort_by')}:
          </span>
          <Select
            value={props.sort}
            onChange={(e) => {
              props.updateParams({ sort: e.target.value });
            }}
            variant="primary"
            size="medium"
            className="bg-white text-on-surface focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="newest">{t('sort_newest')}</option>
            <option value="price_asc">{t('sort_price_asc')}</option>
            <option value="price_desc">{t('sort_price_desc')}</option>
            <option value="rating">{t('sort_rating')}</option>
            <option value="popular">{t('sort_popular')}</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
