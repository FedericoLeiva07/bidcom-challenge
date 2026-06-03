import { Product, Category, SearchResult } from '@/domain/entities/product';

export interface IProductRepository {
  getProducts(limit: number): Promise<Product[]>;
  searchProducts(query: string, limit: number): Promise<SearchResult>;
  getProductBySku(sku: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
}
