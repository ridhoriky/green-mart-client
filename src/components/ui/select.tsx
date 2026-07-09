import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const selectVariants = cva(
  'font-sans cursor-pointer rounded-md border transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 shadow-xs custom-select',
  {
    variants: {
      variant: {
        default:
          'border-input bg-transparent focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        primary:
          'border-outline-variant bg-surface-container-lowest focus-visible:border-primary focus-visible:ring-primary',
        filled:
          'border-transparent bg-surface-container-low focus-visible:bg-surface-container-lowest focus-visible:border-primary focus-visible:ring-primary',
      },
      size: {
        default: 'h-12 pl-4 pr-10 text-sm custom-select-default',
        small: 'h-9 pl-3 pr-8 text-sm custom-select-small',
        medium: 'h-11 pl-4 pr-10 text-[13px] custom-select-medium',
        large: 'h-14 pl-5 pr-12 text-base custom-select-large',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type SelectProps = Omit<React.ComponentPropsWithoutRef<'select'>, 'size'> & {
  variant?: 'default' | 'primary' | 'filled';
  size?: 'default' | 'small' | 'medium' | 'large';
};

/**
 * Renders a styled select dropdown component.
 *
 * @param props - Component properties including variant, size, and standard select attributes.
 * @returns A styled HTML select element.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { variant = 'default', size = 'default', className, ...selectProps } = props;

  return (
    <select
      ref={ref}
      className={cn(
        selectVariants({
          variant,
          size,
          className,
        }),
      )}
      {...selectProps}
    />
  );
});

Select.displayName = 'Select';
