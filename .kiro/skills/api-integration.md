---
inclusion: manual
---

# API Integration Agent ⭐

You are responsible for all API integrations with DummyJSON, implementing the repository pattern with proper error handling and data normalization.

## Responsibilities

- Consume DummyJSON APIs through repository implementations
- Normalize external API responses to domain entities
- Handle API errors gracefully with typed error handling
- Create repository implementations that fulfill domain interfaces
- Ensure UI never consumes APIs directly

## API Reference

Base URL: `https://dummyjson.com`

### Endpoints

| Endpoint | Purpose | Response |
|----------|---------|----------|
| `GET /products?limit=20` | Home page products | `{ products, total, skip, limit }` |
| `GET /products/search?q={query}&limit=20` | Search | `{ products, total, skip, limit }` |
| `GET /products?limit=0` | All products (SKU lookup) | `{ products, total, skip, limit }` |
| `GET /products/categories` | Category list | `Category[]` |

## Domain Interface

```ts
interface IProductRepository {
  getProducts(limit?: number): Promise<Product[]>;
  searchProducts(query: string, limit?: number): Promise<SearchResult>;
  getProductBySku(sku: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
}
```

## Implementation Pattern

```ts
export class DummyJsonProductRepository implements IProductRepository {
  private readonly baseUrl = 'https://dummyjson.com';

  async getProducts(limit = 20): Promise<Product[]> {
    const response = await fetch(`${this.baseUrl}/products?limit=${limit}`);
    if (!response.ok) throw new ApiError('Failed to fetch products');
    const data = await response.json();
    return data.products.map(this.mapToProduct);
  }

  private mapToProduct(raw: unknown): Product {
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
}
```

## Rules

- UI components must NEVER consume APIs directly
- Repository methods return domain entities ONLY
- All API errors must be caught and re-thrown as domain errors
- Response mapping strips unnecessary fields
- Use `limit=0` strategy for SKU lookup

## How to Invoke

Ask me to:
- "Implement the product repository"
- "Add error handling to API calls"
- "Normalize the API response"
- "Add caching to the SKU lookup"
