import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/domain/entities/product';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

function createProduct(id: number): Product {
  return {
    id,
    sku: `SKU-${id}`,
    title: `Product ${id}`,
    description: `Description ${id}`,
    category: 'test',
    price: 10 * id,
    thumbnail: `https://example.com/img-${id}.jpg`,
  };
}

describe('ProductGrid', () => {
  it('renderiza máximo 20 productos', () => {
    const products = Array.from({ length: 25 }, (_, i) => createProduct(i + 1));
    render(<ProductGrid products={products} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(20);
  });

  it('renderiza todos los productos si hay menos de 20', () => {
    const products = Array.from({ length: 5 }, (_, i) => createProduct(i + 1));
    render(<ProductGrid products={products} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
  });

  it('renderiza vacío sin productos', () => {
    const { container } = render(<ProductGrid products={[]} />);
    expect(container.querySelector('a')).toBeNull();
  });
});
