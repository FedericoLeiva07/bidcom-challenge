import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import ProductCard from '@/components/ProductCard';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
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
          title: fc.string({ minLength: 1, maxLength: 50 }),
          price: fc.double({ min: 0.01, max: 99999, noNaN: true }),
          thumbnail: fc.webUrl(),
          sku: fc.string({ minLength: 1, maxLength: 20 }),
        }),
        (props) => {
          const { unmount } = render(<ProductCard {...props} />);
          expect(screen.getByRole('img')).toHaveAttribute('src', props.thumbnail);
          expect(screen.getByText(props.title)).toBeInTheDocument();
          expect(screen.getByText(`$${props.price.toFixed(2)}`)).toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
