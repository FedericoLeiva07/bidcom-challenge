import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DummyJsonProductRepository } from '@/infrastructure/repositories/dummyjson-product-repository';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'A test product',
  category: 'electronics',
  price: 99.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  tags: ['test'],
  brand: 'TestBrand',
  sku: 'TEST-SKU-001',
  weight: 1,
  dimensions: { width: 10, height: 5, depth: 3 },
  warrantyInformation: '1 year',
  shippingInformation: 'Ships in 1 day',
  availabilityStatus: 'In Stock',
  reviews: [],
  returnPolicy: '30 days',
  minimumOrderQuantity: 1,
  meta: { createdAt: '2024-01-01', updatedAt: '2024-01-01', barcode: '123', qrCode: 'qr' },
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/img.jpg'],
};

const mockProductsResponse = {
  products: [mockProduct],
  total: 1,
  skip: 0,
  limit: 20,
};

const mockCategories = [
  { slug: 'electronics', name: 'Electronics', url: 'https://dummyjson.com/products/category/electronics' },
  { slug: 'clothing', name: 'Clothing', url: 'https://dummyjson.com/products/category/clothing' },
];

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('DummyJsonProductRepository', () => {
  const repo = new DummyJsonProductRepository();

  describe('getProducts', () => {
    it('returns mapped products', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProductsResponse),
      }));

      const products = await repo.getProducts(20);

      expect(products).toHaveLength(1);
      expect(products[0]).toEqual({
        id: 1,
        sku: 'TEST-SKU-001',
        title: 'Test Product',
        description: 'A test product',
        category: 'electronics',
        price: 99.99,
        thumbnail: 'https://example.com/thumb.jpg',
      });
    });
  });

  describe('searchProducts', () => {
    it('returns correct SearchResult', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProductsResponse),
      }));

      const result = await repo.searchProducts('test', 20);

      expect(result.total).toBe(1);
      expect(result.products).toHaveLength(1);
      expect(result.products[0].title).toBe('Test Product');
      expect(result.skip).toBe(0);
      expect(result.limit).toBe(20);
    });
  });

  describe('getProductBySku', () => {
    it('returns matching product', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProductsResponse),
      }));

      const product = await repo.getProductBySku('TEST-SKU-001');

      expect(product).not.toBeNull();
      expect(product!.sku).toBe('TEST-SKU-001');
      expect(product!.title).toBe('Test Product');
    });

    it('returns null when SKU not found', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProductsResponse),
      }));

      const product = await repo.getProductBySku('NON-EXISTENT');

      expect(product).toBeNull();
    });
  });

  describe('getCategories', () => {
    it('returns mapped categories', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      }));

      const categories = await repo.getCategories();

      expect(categories).toHaveLength(2);
      expect(categories[0]).toEqual({
        slug: 'electronics',
        name: 'Electronics',
        url: 'https://dummyjson.com/products/category/electronics',
      });
    });
  });

  describe('error handling', () => {
    it('throws when API returns non-ok response', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      }));

      await expect(repo.getProducts(20)).rejects.toThrow('API error: 500 Internal Server Error');
    });
  });
});
