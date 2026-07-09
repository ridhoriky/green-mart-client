import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'font-sans w-full min-w-0 rounded-md border transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      variant: {
        default:
          'border-input bg-transparent focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50',
        primary:
          'border-outline-variant bg-surface-container-lowest focus-visible:border-primary focus-visible:ring-primary',
        filled:
          'border-transparent bg-surface-container-low focus-visible:bg-surface-container-lowest focus-visible:border-primary focus-visible:ring-primary',
      },
      size: {
        default: 'h-12 px-4 text-sm',
        small: 'h-9 px-3 text-sm',
        medium: 'h-12 px-4 text-sm',
        large: 'h-14 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type InputProps = Omit<React.ComponentProps<typeof InputPrimitive>, 'size' | 'color'> &
  VariantProps<typeof inputVariants>;

function Input({ className, type, variant = 'default', size = 'default', ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
