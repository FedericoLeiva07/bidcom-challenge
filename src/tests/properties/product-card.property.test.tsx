import { describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import fc from 'fast-check';
import ProductCard from '@/components/ProductCard';
import { formatPrice } from '@/lib/format-price';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('Property Tests: ProductCard', () => {
  it('el link contiene el SKU correcto', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          price: fc.double({ min: 0.01, max: 99999, noNaN: true }),
          thumbnail: fc.webUrl(),
          sku: fc.string({ minLength: 1, maxLength: 20 }),
        }),
        (props) => {
          cleanup();
          const { unmount } = render(<ProductCard {...props} />);
          const link = screen.getByRole('link');
          expect(link).toHaveAttribute('href', `/product/${props.sku}`);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('renderiza thumbnail, título y precio', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 50 }).map((s) => s.trim().replace(/\s+/g, ' ')).filter((s) => s.length > 0),
          price: fc.integer({
            min: 1,
            max: 9999900,
          }).map(v => v / 100),
          thumbnail: fc.webUrl(),
          sku: fc.string({ minLength: 1, maxLength: 20 }),
        }),
        (props) => {
          cleanup();
          const { unmount, container } = render(<ProductCard {...props} />);
          const img = container.querySelector('img');
          expect(img).toHaveAttribute('src', props.thumbnail);
          expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
          expect(container.textContent).toContain(formatPrice(props.price));
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
