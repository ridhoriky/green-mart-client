'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border border-outline-variant bg-surface-container-lowest text-current transition-all cursor-pointer outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-checked:border-primary data-checked:text-on-primary',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3 stroke-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = 'Checkbox';
