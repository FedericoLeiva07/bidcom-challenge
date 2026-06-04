---
inclusion: always
---

# Bidcom E-Commerce Challenge - Project Overview

## Proyecto

Aplicación e-commerce con Next.js 16 / React 19 / TypeScript que replica visualmente el sitio de Bidcom, consumiendo la API pública de DummyJSON.

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 con Server Components por defecto
- **Estilos**: Tailwind CSS 4
- **Lenguaje**: TypeScript (strict mode)
- **Testing**: Vitest + React Testing Library
- **Docs visuales**: Storybook
- **Linting**: ESLint + Prettier

## API de Datos

Base URL: `https://dummyjson.com`

Endpoints utilizados:
- `GET /products?limit=20` — Home page
- `GET /products/search?q={query}&limit=20` — Búsqueda
- `GET /products?limit=0` — Todos los productos (para buscar por SKU)
- `GET /products/categories` — Categorías

## Entidad Principal

```ts
type Product = {
  id: number;
  sku: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
};
```

## Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Home — Grid de 20 productos |
| `/search?s={query}` | Búsqueda con resultados |
| `/product/[sku]` | Detalle de producto por SKU |

## Referencia Completa

Para la especificación completa del challenge, ver #[[file:spec-kiro-bidcom.md]]
