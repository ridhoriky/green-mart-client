'use client';

import { Card } from '@/components/ui/card';

/**
 * Renders the loading skeleton for the cart page.
 *
 * @returns The CartSkeleton component.
 */
export function CartSkeleton() {
  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-10 w-48 animate-pulse rounded bg-surface-container-high" />
        <div className="h-4 w-72 animate-pulse rounded bg-surface-container-high" />
      </div>

      {/* Content Skeletons */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card
              key={i}
              className="space-y-4 rounded-xl border border-outline-variant bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 animate-pulse rounded bg-surface-container-high" />
                <div className="h-5 w-40 animate-pulse rounded bg-surface-container-high" />
              </div>
              <div className="space-y-4 border-t border-outline-variant pt-4">
                <div className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 animate-pulse rounded-lg bg-surface-container-high" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-surface-container-high" />
                    <div className="h-3 w-1/4 animate-pulse rounded bg-surface-container-high" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-xl bg-surface-container-high" />
      </div>
    </div>
  );
}
