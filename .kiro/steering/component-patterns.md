---
inclusion: fileMatch
fileMatchPattern: "src/components/**/*.tsx"
---

# Component Patterns

## Estructura de un Componente

```tsx
// Server Component (default)
import { Product } from '@/domain/entities/product';

interface ProductCardProps {
  readonly product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    // JSX con Tailwind, Mobile First
  );
}
```

## Client Component (solo cuando necesario)

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchBarProps {
  readonly defaultValue?: string;
}

export function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?s=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    // JSX con input y botón
  );
}
```

## Checklist para Componentes

- [ ] Props tipadas con interface dedicada
- [ ] Responsive Mobile First (base → md: → lg:)
- [ ] Accesible (alt text, aria-labels, roles semánticos)
- [ ] Sin lógica de negocio (delegada al dominio/infra)
- [ ] Sin fetch directo (datos via props desde la página)

## Componentes del Proyecto

### Header
- Logo que navega a `/`
- SearchBar integrado
- Full width, sticky top

### ProductCard
- Link a `/product/{sku}`
- Imagen, título, precio
- Hover effect sutil

### ProductGrid
- CSS Grid responsive
- 1 col mobile, 2 col tablet, 4 col desktop
- Gap consistente

### EmptyState
- Mensaje: "No se encontró ningún producto. Te recomendamos buscar estas categorías."
- Lista de 5 categorías como links a `/search?s={category}`

### SearchBar
- Input + Botón "Buscar"
- Enter dispara búsqueda
- Placeholder descriptivo
