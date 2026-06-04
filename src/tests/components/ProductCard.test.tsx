import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('ProductCard', () => {
  const props = {
    title: 'iPhone 15',
    price: 999.99,
    thumbnail: 'https://example.com/iphone.jpg',
    sku: 'IPHONE-15-PRO',
  };

  it('renderiza la imagen del producto', () => {
    render(<ProductCard {...props} />);
    const img = screen.getByRole('img', { name: props.title });
    expect(img).toHaveAttribute('src', props.thumbnail);
  });

  it('renderiza el título del producto', () => {
    render(<ProductCard {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('renderiza el precio formateado', () => {
    render(<ProductCard {...props} />);
    expect(screen.getByText(/999,99/)).toBeInTheDocument();
  });

  it('tiene link correcto al detalle del producto', () => {
    render(<ProductCard {...props} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/product/${props.sku}`);
  });
});
