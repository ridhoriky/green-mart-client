import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';

const meta = {
  title: 'Components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'filled'],
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    variant: 'default',
    size: 'default',
  },
};

export const Primary: Story = {
  args: {
    placeholder: 'Primary variant...',
    variant: 'primary',
  },
};

export const Filled: Story = {
  args: {
    placeholder: 'Filled variant...',
    variant: 'filled',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input...',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input...',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input...',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid input...',
    'aria-invalid': true,
  },
};
