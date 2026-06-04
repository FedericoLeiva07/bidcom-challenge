# Spec Kiro - Evaluación Técnica Frontend Bidcom

## Objetivo

Desarrollar una aplicación e-commerce en **Next.js (última versión)** utilizando **TypeScript**, tomando como referencia visual el sitio de **Bidcom**.

La aplicación deberá consumir datos exclusivamente desde la API pública de **DummyJSON Products**, implementando una arquitectura moderna, orientada al servidor, responsive y mantenible.

---

# Requisitos Técnicos Obligatorios

## Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS 4+
- React Server Components (Server-First)
- ESLint
- Prettier

## Testing

Implementar:

- Unit Tests con Vitest o Jest
- React Testing Library
- Cobertura mínima:
  - ProductCard
  - SearchBar
  - Product Repository
  - Casos de búsqueda vacía

## Responsive

Diseño Mobile First.

Breakpoints sugeridos:

- Mobile: <768px
- Tablet: 768px+
- Desktop: 1024px+

## Arquitectura

Seguir principios:

- SOLID
- Clean Architecture
- Separation of Concerns

```text
src/
├── app/
│   ├── page.tsx
│   ├── search/
│   │   └── page.tsx
│   └── product/
│       └── [sku]/
│           └── page.tsx
├── domain/
├── infrastructure/
├── components/
├── stories/
├── tests/
└── lib/
```

## Storybook

Crear stories para:

- ProductCard
- SearchBar
- Header
- EmptyState
- ProductGrid

---

# Integración DummyJSON

Base URL:

```text
https://dummyjson.com
```

## Entidad Product

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

---

# Funcionalidades

## Home (/)

- Consumir `GET /products?limit=20`
- Mostrar máximo 20 productos
- Grid responsive
- Click en card → `/product/{sku}`

## Header

- Logo Bidcom → `/`
- Barra de búsqueda → `/search?s={termino}`

## Página de Búsqueda

Ruta:

```text
/search?s={query}
```

API:

```http
GET /products/search?q={query}
```

Requisitos:

- Limitar resultados a 20
- Mostrar cantidad de resultados
- Mostrar término buscado
- Renderizar grilla de productos

## Estado Sin Resultados

Mensaje:

> No se encontró ningún producto. Te recomendamos buscar estas categorías.

Obtener categorías desde:

```http
GET /products/categories
```

Mostrar las primeras 5 categorías como links:

```text
/search?s=beauty
/search?s=smartphones
...
```

## Página de Producto

Ruta:

```text
/product/[sku]
```

DummyJSON no posee endpoint por SKU.

Estrategia:

1. Obtener productos con `GET /products?limit=0`
2. Buscar por SKU
3. Mostrar 404 si no existe

Información mínima:

- Imagen
- Título
- Precio
- Categoría
- Descripción

---

# Componentes

## Header

- Logo
- SearchBar

## SearchBar

- Enter ejecuta búsqueda
- Botón Buscar ejecuta búsqueda

## ProductCard

Mostrar:

- Imagen
- Nombre
- Precio

## ProductGrid

Grid responsive.

## EmptyState

Renderizar categorías sugeridas.

---

# Server Side Strategy

- Server Components por defecto
- Client Components sólo para UI interactiva
- Fetches ejecutados en servidor

---

# SEO

## Search

```ts
title: `Resultados para ${query}`
```

## Product

```ts
title: product.title
description: product.description
```

---

# Manejo de Errores

## API Error

```text
Ocurrió un error al cargar los productos.
```

## Producto inexistente

Utilizar:

```ts
notFound()
```

---

# Testing

## ProductCard

- Render del título
- Render del precio
- Render de imagen

## SearchBar

- Render input
- Navegación al buscar

## Repository

- SearchProducts
- GetProductBySku
- GetCategories

## Empty Results

- Mensaje visible
- Categorías visibles

---

# Criterios de Aceptación

## Home

- Muestra hasta 20 productos
- Responsive
- Cards clickeables

## Search

- Busca mediante DummyJSON
- Redirecciona correctamente
- Limita a 20 resultados

## Empty State

- Muestra mensaje requerido
- Muestra 5 categorías

## Product Detail

- Accesible por SKU
- Muestra información del producto
- 404 cuando no existe

## Calidad Técnica

- TypeScript estricto
- Next.js App Router
- Tailwind
- Tests funcionando
- Clean Architecture
- Server Components por defecto
- Responsive Mobile First
- Storybook implementado
