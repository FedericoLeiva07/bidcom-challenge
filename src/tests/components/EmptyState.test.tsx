import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '@/components/EmptyState';
import { Category } from '@/domain/entities/product';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const categories: Category[] = [
  { slug: 'electronics', name: 'Electronics', url: 'https://dummyjson.com/products/category/electronics' },
  { slug: 'clothing', name: 'Clothing', url: 'https://dummyjson.com/products/category/clothing' },
  { slug: 'furniture', name: 'Furniture', url: 'https://dummyjson.com/products/category/furniture' },
  { slug: 'shoes', name: 'Shoes', url: 'https://dummyjson.com/products/category/shoes' },
  { slug: 'groceries', name: 'Groceries', url: 'https://dummyjson.com/products/category/groceries' },
  { slug: 'sports', name: 'Sports', url: 'https://dummyjson.com/products/category/sports' },
];

describe('EmptyState', () => {
  it('muestra el mensaje de no resultados', () => {
    render(<EmptyState categories={categories} />);
    expect(screen.getByText(/no se encontró ningún producto/i)).toBeInTheDocument();
  });

  it('muestra máximo 5 categorías como links', () => {
    render(<EmptyState categories={categories} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
  });

  it('cada categoría tiene link correcto a búsqueda', () => {
    render(<EmptyState categories={categories} />);
    const electronicsLink = screen.getByRole('link', { name: 'Electronics' });
    expect(electronicsLink).toHaveAttribute('href', '/search?s=Electronics&cat=electronics');
  });
});
