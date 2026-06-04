---
inclusion: fileMatch
fileMatchPattern: "src/app/**/page.tsx"
---

# SEO & Metadata Guide

## Patrón para Metadata Dinámica

```tsx
import type { Metadata } from 'next';

// Para páginas con datos dinámicos
export async function generateMetadata({ params, searchParams }): Promise<Metadata> {
  // fetch data si es necesario
  return {
    title: '...',
    description: '...',
  };
}
```

## Metadata por Página

### Home (`/`)
```ts
export const metadata: Metadata = {
  title: 'Bidcom - E-Commerce',
  description: 'Encontrá los mejores productos al mejor precio.',
};
```

### Search (`/search?s={query}`)
```ts
// generateMetadata
title: `Resultados para "${query}"`
description: `Resultados de búsqueda para ${query} en Bidcom`
```

### Product Detail (`/product/[sku]`)
```ts
// generateMetadata
title: product.title
description: product.description
```

## Notas

- Usar `generateMetadata` async para páginas con datos dinámicos
- El título debe ser descriptivo y contener la keyword relevante
- No duplicar metadata entre layout y page
