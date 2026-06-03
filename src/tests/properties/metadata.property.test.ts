import { describe, it, expect, vi } from 'vitest';
import fc from 'fast-check';
import { generateMetadata as searchMetadata } from '@/app/search/page';
import { generateMetadata as productMetadata } from '@/app/product/[sku]/page';

describe('Property Tests: Metadata', () => {
  it('search page metadata contiene el query string', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 100 }),
        async (query) => {
          const metadata = await searchMetadata({
            searchParams: Promise.resolve({ s: query }),
          });
          expect(metadata.title).toBe(`Resultados para ${query}`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('product page metadata usa título y descripción del producto', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
          sku: fc.string({ minLength: 1, maxLength: 20 }),
        }),
        async ({ title, description, sku }) => {
          const mockProduct = {
            id: 1,
            sku,
            title,
            description,
            category: 'test',
            price: 10,
            thumbnail: 'https://example.com/img.jpg',
          };

          vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ products: [mockProduct], total: 1, skip: 0, limit: 0 }),
          }));

          const metadata = await productMetadata({
            params: Promise.resolve({ sku }),
          });

          expect(metadata.title).toBe(title);
          expect(metadata.description).toBe(description);

          vi.restoreAllMocks();
        }
      ),
      { numRuns: 100 }
    );
  });
});
