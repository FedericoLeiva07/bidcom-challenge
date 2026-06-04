---
inclusion: fileMatch
fileMatchPattern: "**/*.test.{ts,tsx}"
---

# Testing Strategy

## Framework

- **Runner**: Vitest
- **DOM**: React Testing Library + jsdom
- **Assertions**: Vitest built-in (expect, vi)

## Estructura de Tests

```text
src/tests/
├── components/
│   ├── ProductCard.test.tsx
│   ├── SearchBar.test.tsx
│   ├── ProductGrid.test.tsx
│   ├── Header.test.tsx
│   └── EmptyState.test.tsx
└── infrastructure/
    └── dummyjson-product-repository.test.ts
```

## Cobertura Mínima Requerida

### ProductCard
- Renderiza el título del producto
- Renderiza el precio correctamente formateado
- Renderiza la imagen con alt text

### SearchBar
- Renderiza el input de búsqueda
- Navega a `/search?s={term}` al presionar Enter
- Navega a `/search?s={term}` al hacer click en botón Buscar

### Product Repository
- `searchProducts(query)` — retorna productos filtrados
- `getProductBySku(sku)` — retorna producto o null
- `getCategories()` — retorna lista de categorías

### Empty Results
- Muestra el mensaje "No se encontró ningún producto..."
- Muestra las 5 primeras categorías como links

## Patrones

### Mock de fetch
```ts
vi.stubGlobal('fetch', vi.fn());

beforeEach(() => {
  vi.mocked(fetch).mockReset();
});
```

### Mock de next/navigation
```ts
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams('s=test'),
}));
```

### Render de Server Components
Para testear Server Components, renderizar como función async:
```ts
const result = await ComponentName({ props });
render(result);
```

## Convenciones

- Cada test debe ser independiente (no depender del orden)
- Usar `screen.getByRole`, `screen.getByText` — no `querySelector`
- Describir el comportamiento, no la implementación
- Nombres de test en español para consistencia con la spec
