---
inclusion: fileMatch
fileMatchPattern: "src/infrastructure/**/*.ts"
---

# DummyJSON API Integration Guide

## Base URL

```
https://dummyjson.com
```

## Endpoints

### Productos (Home)
```http
GET /products?limit=20
```
Response: `{ products: Product[], total: number, skip: number, limit: number }`

### Búsqueda
```http
GET /products/search?q={query}&limit=20
```
Response: `{ products: Product[], total: number, skip: number, limit: number }`

### Todos los Productos (para búsqueda por SKU)
```http
GET /products?limit=0
```
Response: `{ products: Product[], total: number, skip: number, limit: number }`

Nota: `limit=0` retorna TODOS los productos. Filtrar por SKU en el servidor.

### Categorías
```http
GET /products/categories
```
Response: `Category[]` donde Category = `{ slug: string, name: string, url: string }`

## Mapeo de Datos

La API retorna más campos de los necesarios. El repository debe mapear solo los campos del dominio:

```ts
// Mapear response de API → entidad del dominio
function mapToProduct(raw: DummyJsonProduct): Product {
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
```

## Estrategia de Búsqueda por SKU

DummyJSON no tiene endpoint por SKU. La estrategia es:

1. Fetch todos los productos con `limit=0`
2. Buscar el producto cuyo `sku` coincida
3. Si no se encuentra → `notFound()`

Considerar caching con `next/cache` o `unstable_cache` para evitar cargar todos los productos en cada request.

## Error Handling

- Si fetch falla → lanzar error tipado que la página capture
- Si producto no existe → retornar `null`, la página llama `notFound()`
- Usar `revalidate` para ISR si es necesario

## Fetch Options

```ts
// Revalidar cada hora (opcional)
fetch(url, { next: { revalidate: 3600 } });
```
