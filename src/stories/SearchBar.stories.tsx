import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '@/components/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <header className="sticky top-0 z-50 bg-bidcom-500 shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Story />
        </div>
      </header>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Empty: Story = {};

export const WithQuery: Story = {
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      input.value = 'laptop';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

export const Focused: Story = {
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) input.focus();
  },
};

export const LongQuery: Story = {
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      input.value = 'auriculares bluetooth inalámbricos con cancelación de ruido activa';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

export const SpecialCharacters: Story = {
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      input.value = 'iPhone 15 "Pro" & más';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};
