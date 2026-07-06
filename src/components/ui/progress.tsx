'use client';

import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import * as React from 'react';
import { cn } from '@/lib/utils';

type ProgressProps = {
  indicatorClassName?: string;
} & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>;

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, indicatorClassName, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      className={cn('relative w-full overflow-hidden rounded-full bg-surface-container', className)}
      {...props}
    >
      <ProgressPrimitive.Track className="h-full w-full">
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full bg-primary transition-all duration-300 ease-in-out',
            indicatorClassName,
          )}
          style={{ width: `${value ?? 0}%` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  ),
);
Progress.displayName = 'Progress';

export { Progress };
