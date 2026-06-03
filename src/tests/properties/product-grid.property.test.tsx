import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/domain/entities/product';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const productArb: fc.Arbitrary<Product> = fc.record({
  id: fc.nat(),
  sku: fc.string({ minLength: 1, maxLength: 20 }),
  title: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string(),
  category: fc.string({ minLength: 1 }),
  price: fc.double({ min: 0.01, max: 99999, noNaN: true }),
  thumbnail: fc.webUrl(),
});

describe('Property Tests: ProductGrid', () => {
  it('nunca renderiza más de 20 items', () => {
    fc.assert(
      fc.property(
        fc.array(productArb, { minLength: 0, maxLength: 50 }),
        (products) => {
          const { unmount } = render(<ProductGrid products={products} />);
          const links = screen.queryAllByRole('link');
          expect(links.length).toBeLessThanOrEqual(20);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
