import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from '@/components/ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-[250px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    title: 'iPhone 15 Pro Max',
    price: 1199.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro%20Max/thumbnail.png',
    sku: 'IPHONE-15-PRO',
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Samsung Galaxy S24 Ultra 256GB Titanium Black Edition Limited Release',
    price: 1399.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S24/thumbnail.png',
    sku: 'SAMSUNG-S24-ULTRA',
  },
};

export const HighPrice: Story = {
  args: {
    title: 'MacBook Pro M3 Max',
    price: 89999.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png',
    sku: 'MACBOOK-PRO-M3',
  },
};

export const MissingThumbnail: Story = {
  args: {
    title: 'Producto sin imagen',
    price: 49.99,
    thumbnail: '',
    sku: 'NO-IMAGE',
  },
};

export const BrokenImage: Story = {
  args: {
    title: 'Producto con imagen rota',
    price: 299.99,
    thumbnail: 'https://invalid-url-that-will-fail.com/image.jpg',
    sku: 'BROKEN-IMG',
  },
};

export const LowPrice: Story = {
  args: {
    title: 'Cable USB-C',
    price: 2.5,
    thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/thumbnail.png',
    sku: 'CABLE-USBC',
  },
};
