import { describe, it, expect, vi } from 'vitest';
import fc from 'fast-check';
import { DummyJsonProductRepository, mapToProduct } from '@/infrastructure/repositories/dummyjson-product-repository';

const dummyJsonProductArb = fc.record({
  id: fc.nat(),
  title: fc.string({ minLength: 1 }),
  description: fc.string(),
  category: fc.string({ minLength: 1 }),
  price: fc.double({ min: 0.01, max: 99999, noNaN: true }),
  discountPercentage: fc.double({ min: 0, max: 100, noNaN: true }),
  rating: fc.double({ min: 0, max: 5, noNaN: true }),
  stock: fc.nat(),
  tags: fc.array(fc.string()),
  brand: fc.string(),
  sku: fc.string({ minLength: 1, maxLength: 20 }),
  weight: fc.nat(),
  dimensions: fc.record({ width: fc.nat(), height: fc.nat(), depth: fc.nat() }),
  warrantyInformation: fc.string(),
  shippingInformation: fc.string(),
  availabilityStatus: fc.string(),
  reviews: fc.constant([] as unknown[]),
  returnPolicy: fc.string(),
  minimumOrderQuantity: fc.nat({ max: 100 }),
  meta: fc.record({
    createdAt: fc.string(),
    updatedAt: fc.string(),
    barcode: fc.string(),
    qrCode: fc.string(),
  }),
  thumbnail: fc.webUrl(),
  images: fc.array(fc.webUrl()),
});

describe('Property Tests: Repository', () => {
  it('getProductBySku returns correct product or null', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(dummyJsonProductArb, { minLength: 0, maxLength: 30 }),
        fc.string({ minLength: 1, maxLength: 20 }),
        async (products, targetSku) => {
          vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ products, total: products.length, skip: 0, limit: 0 }),
          }));

          const repo = new DummyJsonProductRepository();
          const result = await repo.getProductBySku(targetSku);

          const expected = products.find((p) => p.sku === targetSku);

          if (expected) {
            expect(result).not.toBeNull();
            expect(result!.sku).toBe(targetSku);
            expect(result!.id).toBe(expected.id);
            expect(result!.title).toBe(expected.title);
          } else {
            expect(result).toBeNull();
          }

          vi.restoreAllMocks();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('mapToProduct preserves all domain fields', () => {
    fc.assert(
      fc.property(dummyJsonProductArb, (rawProduct) => {
        const mapped = mapToProduct(rawProduct);

        expect(mapped.id).toBe(rawProduct.id);
        expect(mapped.sku).toBe(rawProduct.sku);
        expect(mapped.title).toBe(rawProduct.title);
        expect(mapped.description).toBe(rawProduct.description);
        expect(mapped.category).toBe(rawProduct.category);
        expect(mapped.price).toBe(rawProduct.price);
        expect(mapped.thumbnail).toBe(rawProduct.thumbnail);
      }),
      { numRuns: 100 }
    );
  });
});
