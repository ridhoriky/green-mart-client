import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './label';

const meta = {
  title: 'Components/UI/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email Address',
  },
};
