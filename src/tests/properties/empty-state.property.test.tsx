import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import EmptyState from '@/components/EmptyState';
import { Category } from '@/domain/entities/product';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const categoryArb: fc.Arbitrary<Category> = fc.record({
  slug: fc.string({ minLength: 1, maxLength: 20 }),
  name: fc.string({ minLength: 1, maxLength: 30 }),
  url: fc.webUrl(),
});

describe('Property Tests: EmptyState', () => {
  it('renderiza exactamente 5 links cuando hay 5+ categorías', () => {
    fc.assert(
      fc.property(
        fc.array(categoryArb, { minLength: 5, maxLength: 20 }),
        (categories) => {
          const { unmount } = render(<EmptyState categories={categories} />);
          const links = screen.getAllByRole('link');
          expect(links).toHaveLength(5);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('los links de categoría navegan a /search?s={name}', () => {
    fc.assert(
      fc.property(
        fc.array(categoryArb, { minLength: 5, maxLength: 10 }),
        (categories) => {
          const { unmount } = render(<EmptyState categories={categories} />);
          const links = screen.getAllByRole('link');
          const firstFive = categories.slice(0, 5);
          firstFive.forEach((cat, i) => {
            expect(links[i]).toHaveAttribute('href', `/search?s=${encodeURIComponent(cat.name)}`);
          });
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
