import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from './select';

const meta = {
  title: 'Components/UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </>
);

export const Default: Story = {
  args: {
    children: options,
    disabled: false,
    variant: 'default',
    size: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: options,
    variant: 'primary',
    size: 'medium',
  },
};

export const Filled: Story = {
  args: {
    children: options,
    variant: 'filled',
  },
};

export const Small: Story = {
  args: {
    children: options,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: options,
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    children: options,
    disabled: true,
  },
};
