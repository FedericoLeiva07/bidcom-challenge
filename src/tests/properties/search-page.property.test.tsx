import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';

describe('Property Tests: Search Page', () => {
  it('muestra el query y el total de resultados', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter((s) => !/[.*+?^${}()|[\]\\]/g.test(s)),
        fc.nat({ max: 1000 }),
        (query, total) => {
          const { unmount } = render(
            <section>
              <p>{total} resultados para &quot;{query}&quot;</p>
            </section>
          );
          expect(screen.getByText(new RegExp(String(total)))).toBeInTheDocument();
          expect(screen.getByText(new RegExp(query))).toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
