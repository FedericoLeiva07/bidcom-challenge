import { Product, Category, SearchResult } from '@/domain/entities/product';
import { IProductRepository } from '@/domain/repositories/product-repository';
import {
  DummyJsonProduct,
  DummyJsonProductsResponse,
  DummyJsonCategory,
} from '@/infrastructure/types/dummyjson';

export function mapToProduct(raw: DummyJsonProduct): Product {
  return {
    id: raw.id,
    sku: raw.sku,
    title: raw.title,
    description: raw.description,
    category: raw.category,
    price: raw.price,
    thumbnail: raw.thumbnail,
  };
}

const API_BASE_URL = 'https://dummyjson.com';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export class DummyJsonProductRepository implements IProductRepository {
  async getProducts(limit: number): Promise<Product[]> {
    const data = await fetchJson<DummyJsonProductsResponse>(
      `${API_BASE_URL}/products?limit=${limit}`
    );
    return data.products.map(mapToProduct);
  }

  async searchProducts(query: string, limit: number): Promise<SearchResult> {
    const data = await fetchJson<DummyJsonProductsResponse>(
      `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    return {
      products: data.products.map(mapToProduct),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
  }

  async getProductBySku(sku: string): Promise<Product | null> {
    const data = await fetchJson<DummyJsonProductsResponse>(
      `${API_BASE_URL}/products?limit=0`
    );
    const found = data.products.find((p) => p.sku === sku);
    return found ? mapToProduct(found) : null;
  }

  async getCategories(): Promise<Category[]> {
    const data = await fetchJson<DummyJsonCategory[]>(
      `${API_BASE_URL}/products/categories`
    );
    return data.map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      url: cat.url,
    }));
  }
}
