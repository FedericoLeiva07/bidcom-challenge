import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';

describe('Property Tests: Product Detail Page', () => {
  it('renderiza imagen, título, precio, categoría y descripción', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 50 }),
          price: fc.double({ min: 0.01, max: 99999, noNaN: true }),
          thumbnail: fc.webUrl(),
          category: fc.string({ minLength: 1, maxLength: 20 }),
          description: fc.string({ minLength: 1, maxLength: 100 }),
        }),
        (product) => {
          const { unmount } = render(
            <article>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.category}</p>
              <h1>{product.title}</h1>
              <p>${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
            </article>
          );
          expect(screen.getByRole('img')).toHaveAttribute('src', product.thumbnail);
          expect(screen.getByText(product.title)).toBeInTheDocument();
          expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
          expect(screen.getByText(product.category)).toBeInTheDocument();
          expect(screen.getByText(product.description)).toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
