import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from '@/components/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const allCategories = [
  { slug: 'smartphones', name: 'Smartphones', url: 'https://dummyjson.com/products/category/smartphones' },
  { slug: 'laptops', name: 'Laptops', url: 'https://dummyjson.com/products/category/laptops' },
  { slug: 'fragrances', name: 'Fragrances', url: 'https://dummyjson.com/products/category/fragrances' },
  { slug: 'skincare', name: 'Skincare', url: 'https://dummyjson.com/products/category/skincare' },
  { slug: 'groceries', name: 'Groceries', url: 'https://dummyjson.com/products/category/groceries' },
  { slug: 'home-decoration', name: 'Home Decoration', url: 'https://dummyjson.com/products/category/home-decoration' },
];

export const WithFiveCategories: Story = {
  args: {
    categories: allCategories.slice(0, 5),
  },
};

export const WithFewerCategories: Story = {
  args: {
    categories: allCategories.slice(0, 3),
  },
};
