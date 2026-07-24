/**
 * Render loading skeleton matching the new layout.
 *
 * @returns The categories skeleton element.
 */
export function CategoriesSkeleton() {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="mb-4 h-4 w-40 animate-pulse rounded bg-surface-container-high" />
        <div className="mb-2 h-12 w-72 animate-pulse rounded bg-surface-container-high" />
        <div className="h-5 w-96 animate-pulse rounded bg-surface-container-high" />
      </div>
      {/* Search skeleton */}
      <div className="mb-8 h-11 max-w-md animate-pulse rounded-full bg-surface-container-high" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Sidebar skeleton */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="space-y-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-stack-md">
            <div className="mb-4 h-3 w-24 animate-pulse rounded bg-surface-container-high" />
            {Array.from({ length: 5 }).map((_sidebarItem, i) => (
              <div key={i} className="h-10 animate-pulse rounded-lg bg-surface-container-high" />
            ))}
          </div>
        </aside>
        {/* Content skeleton */}
        <div className="col-span-12 space-y-10 md:col-span-9 lg:col-span-10">
          {Array.from({ length: 2 }).map((_section, si) => (
            <div key={si}>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-8 w-48 animate-pulse rounded bg-surface-container-high" />
                <div className="h-px grow bg-outline-variant/30" />
                <div className="h-4 w-24 animate-pulse rounded bg-surface-container-high" />
              </div>
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_card, ci) => (
                  <div key={ci}>
                    <div className="aspect-square animate-pulse rounded-xl bg-surface-container-high" />
                    <div className="mt-4 h-5 w-32 animate-pulse rounded bg-surface-container-high" />
                    <div className="mt-2 h-4 w-48 animate-pulse rounded bg-surface-container-high" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
