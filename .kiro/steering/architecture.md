---
inclusion: always
---

# Arquitectura del Proyecto

## Principios

- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Clean Architecture**: Separación clara entre dominio, infraestructura y presentación
- **Server-First**: React Server Components por defecto, Client Components solo para interactividad

## Estructura de Directorios

```text
src/
├── app/                    # Next.js App Router (páginas y layouts)
│   ├── page.tsx            # Home
│   ├── layout.tsx          # Layout principal
│   ├── search/
│   │   └── page.tsx        # Búsqueda
│   └── product/
│       └── [sku]/
│           └── page.tsx    # Detalle de producto
├── domain/                 # Entidades y contratos (interfaces)
│   ├── entities/
│   │   └── product.ts
│   └── repositories/
│       └── product-repository.ts
├── infrastructure/         # Implementaciones concretas (API calls)
│   └── repositories/
│       └── dummyjson-product-repository.ts
├── components/             # Componentes React reutilizables
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── EmptyState.tsx
├── stories/                # Storybook stories
├── tests/                  # Tests unitarios
└── lib/                    # Utilidades compartidas
```

## Reglas de Dependencia

```
app/ → components/ → domain/
                   → lib/
infrastructure/ → domain/
app/ → infrastructure/ (solo para inyectar implementaciones)
```

- `domain/` NO depende de nada externo
- `infrastructure/` implementa interfaces definidas en `domain/`
- `components/` reciben datos via props, no hacen fetch directamente
- `app/` pages orquestan: obtienen datos del repository y los pasan a componentes

## Server vs Client Components

### Server Components (default)
- Páginas (`page.tsx`)
- Layout (`layout.tsx`)
- `ProductCard`, `ProductGrid`, `EmptyState`
- Cualquier componente que solo renderiza datos

### Client Components (`"use client"`)
- `SearchBar` (maneja input del usuario y navegación)
- Cualquier componente con `useState`, `useEffect`, event handlers

## Convenciones

- Un archivo por componente
- Nombres en PascalCase para componentes
- Nombres en kebab-case para archivos de dominio/infra
- Interfaces con prefijo `I` (ej: `IProductRepository`)
- Los repositorios devuelven siempre tipos del dominio
