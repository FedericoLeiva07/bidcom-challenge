---
inclusion: always
---

# Coding Standards

## TypeScript

- Strict mode habilitado
- No usar `any` — usar tipos explícitos o genéricos
- Preferir `interface` para contratos públicos, `type` para uniones/intersecciones
- Exportar tipos desde archivos dedicados
- Usar `readonly` donde corresponda

## React / Next.js

- Server Components por defecto — agregar `"use client"` solo cuando sea necesario
- No usar `useEffect` para fetching — usar Server Components o route handlers
- Props tipadas con interfaces dedicadas
- Usar `Suspense` boundaries para loading states
- Metadata via `generateMetadata` o export `metadata`

## Estilos (Tailwind CSS 4)

- Mobile First: estilos base para mobile, `md:` para tablet, `lg:` para desktop
- No usar `@apply` en exceso — preferir clases utilitarias en JSX
- Breakpoints: mobile (<768px), tablet (768px+), desktop (1024px+)
- Usar variables CSS de Tailwind para colores del tema

## Testing

- Archivos de test en `src/tests/` con sufijo `.test.ts` o `.test.tsx`
- Un test file por módulo/componente
- Usar `describe` + `it` para organización
- Mock de fetch/API en tests de repository
- Testing Library: queries por rol y texto accesible (no por className)

## Naming

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Componentes | PascalCase | `ProductCard.tsx` |
| Páginas | lowercase | `page.tsx` |
| Dominio/Infra | kebab-case | `product-repository.ts` |
| Interfaces | Prefijo I | `IProductRepository` |
| Types | PascalCase | `Product`, `SearchResult` |
| Constantes | UPPER_SNAKE | `API_BASE_URL` |
| Funciones | camelCase | `getProductBySku` |

## Imports

- Path aliases via `@/` apuntando a `src/`
- Orden: 1) React/Next, 2) Librerías externas, 3) Dominio, 4) Componentes, 5) Lib/Utils
- No usar `import *`

## Comentarios

- No agregar comentarios al código
- El código debe ser autoexplicativo a través de buenos nombres de variables, funciones y tipos
- Excepción: comentarios requeridos por la spec de property tests (Feature/Property tags)

## Error Handling

- Usar `error.tsx` de Next.js para errores de página
- Usar `notFound()` para productos inexistentes
- Los repositorios lanzan errores tipados, las páginas los capturan
- Mensajes de error en español según spec
