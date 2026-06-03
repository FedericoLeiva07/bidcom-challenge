import type { Meta, StoryObj } from '@storybook/react';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/domain/entities/product';

function createProduct(id: number): Product {
  return {
    id,
    sku: `SKU-${id}`,
    title: `Producto de ejemplo ${id}`,
    description: `Descripción del producto ${id}`,
    category: 'electronics',
    price: 99.99 + id * 10,
    thumbnail: `https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro%20Max/thumbnail.png`,
  };
}

const meta: Meta<typeof ProductGrid> = {
  title: 'Components/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

export const FullGrid: Story = {
  args: {
    products: Array.from({ length: 20 }, (_, i) => createProduct(i + 1)),
  },
};

export const PartialGrid: Story = {
  args: {
    products: Array.from({ length: 5 }, (_, i) => createProduct(i + 1)),
  },
};

export const SingleProduct: Story = {
  args: {
    products: [createProduct(1)],
  },
};

export const Empty: Story = {
  args: {
    products: [],
  },
};
