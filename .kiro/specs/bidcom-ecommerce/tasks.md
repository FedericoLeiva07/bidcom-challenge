# Implementation Plan: Bidcom E-Commerce

## Overview

Server-rendered e-commerce frontend built with Next.js 16 (App Router), React 19, and TypeScript (strict mode). Clean Architecture with domain/infrastructure/components layers, consuming the DummyJSON public API. Implementation uses Server Components by default, with only SearchBar as a Client Component.

## Tasks

- [x] 1. Project setup and tooling configuration
  - [x] 1.1 Configure package.json engines and install dev dependencies
    - Add `"engines": { "node": ">=20.9.0" }` to package.json
    - Install dev dependencies: `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`, `prettier`
    - Add test scripts: `"test": "vitest --run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest --run --coverage"`
    - Add format script: `"format": "prettier --write ."`
    - _Requirements: 11.1, 11.2_

  - [x] 1.2 Configure Vitest for Next.js with React Testing Library
    - Create `vitest.config.ts` at project root with `@vitejs/plugin-react`, jsdom environment, path alias `@/` → `./src/`
    - Create `src/tests/setup.ts` with `@testing-library/jest-dom` import
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 1.3 Configure Storybook 8 with Next.js framework
    - Install Storybook dependencies: `storybook`, `@storybook/nextjs`, `@storybook/react`, `@storybook/addon-essentials`, `@storybook/addon-interactions`
    - Initialize Storybook config in `.storybook/` with `main.ts` and `preview.ts`
    - Configure stories path to `src/stories/**/*.stories.@(ts|tsx)`
    - Add scripts: `"storybook": "storybook dev -p 6006"`, `"build-storybook": "storybook build"`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [x] 1.4 Create directory structure for Clean Architecture
    - Create directories: `src/domain/entities/`, `src/domain/repositories/`, `src/infrastructure/repositories/`, `src/components/`, `src/lib/`, `src/tests/components/`, `src/tests/infrastructure/`, `src/tests/properties/`, `src/stories/`
    - Verify `@/*` path alias is already configured in `tsconfig.json`
    - _Requirements: 8.1, 8.2_

- [x] 2. Domain layer — entities and repository interface
  - [x] 2.1 Define domain entities
    - Create `src/domain/entities/product.ts` with `Product`, `Category`, and `SearchResult` interfaces
    - All fields must be `readonly`
    - Export all types for use across the application
    - _Requirements: 8.2, 8.5_

  - [x] 2.2 Define repository interface
    - Create `src/domain/repositories/product-repository.ts` with `IProductRepository` interface
    - Methods: `getProducts(limit: number)`, `searchProducts(query: string, limit: number)`, `getProductBySku(sku: string)`, `getCategories()`
    - Interface must depend only on domain entities
    - _Requirements: 8.2, 8.5, 8.6_

- [x] 3. Infrastructure layer — DummyJSON repository implementation
  - [x] 3.1 Implement DummyJsonProductRepository
    - Create `src/infrastructure/repositories/dummyjson-product-repository.ts`
    - Implement `IProductRepository` interface with all four methods
    - Define internal types for raw API response shapes (`DummyJsonProduct`, `DummyJsonProductsResponse`, `DummyJsonCategory`)
    - Implement `mapToProduct` mapping function from raw to domain entity
    - Implement `fetchJson` helper with error handling (throw on non-ok response)
    - `getProductBySku`: fetch all products with `limit=0`, filter by SKU, return `null` if not found
    - _Requirements: 1.1, 2.4, 3.2, 4.1, 4.2, 4.4, 8.6_

  - [x] 3.2 Write unit tests for DummyJsonProductRepository
    - Create `src/tests/infrastructure/dummyjson-product-repository.test.ts`
    - Mock `fetch` globally using `vi.fn()`
    - Test `getProducts` returns mapped products
    - Test `searchProducts` returns correct SearchResult
    - Test `getProductBySku` returns matching product or null
    - Test `getCategories` returns mapped categories
    - Test error handling when API returns non-ok response
    - _Requirements: 9.3_

  - [x] 3.3 Write property tests for repository SKU lookup and mapping
    - Create `src/tests/properties/repository.property.test.ts`
    - **Property 7: Repository SKU lookup returns correct result**
    - **Validates: Requirements 4.2, 4.4**
    - **Property 8: Product mapping round trip preserves domain fields**
    - **Validates: Requirements 9.3**
    - Use `fast-check` with minimum 100 iterations
    - Generate random product arrays and SKU strings

- [x] 4. Checkpoint — Domain and infrastructure verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. UI Components — Header and SearchBar
  - [x] 5.1 Implement Header component
    - Create `src/components/Header.tsx` as a Server Component
    - Render Bidcom logo as a link to `/`
    - Embed SearchBar component
    - Use Tailwind for responsive layout
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 5.2 Implement SearchBar client component
    - Create `src/components/SearchBar.tsx` with `"use client"` directive
    - Render text input and search button
    - Use `useState` for query input
    - Use `useRouter` from `next/navigation` to navigate to `/search?s={query}` on Enter or button click
    - _Requirements: 2.1, 2.2, 2.3, 8.4_

  - [x] 5.3 Write unit tests for Header and SearchBar
    - Create `src/tests/components/Header.test.tsx`
    - Verify Header renders logo link to `/` and contains SearchBar
    - Create `src/tests/components/SearchBar.test.tsx`
    - Verify SearchBar renders input and button
    - Verify search triggers navigation on Enter and button click
    - _Requirements: 9.2_

  - [x] 5.4 Write property test for SearchBar navigation
    - Create `src/tests/properties/search-bar.property.test.tsx`
    - **Property 3: SearchBar navigates to correct search URL**
    - **Validates: Requirements 2.2, 2.3**
    - Generate random non-empty query strings, verify navigation target is `/search?s={query}`

- [x] 6. UI Components — ProductCard, ProductGrid, and EmptyState
  - [x] 6.1 Implement ProductCard component
    - Create `src/components/ProductCard.tsx` as a Server Component
    - Render product thumbnail (as `<img>`), title, and formatted price
    - Wrap in a link to `/product/{sku}`
    - _Requirements: 1.3, 7.5_

  - [x] 6.2 Implement ProductGrid component
    - Create `src/components/ProductGrid.tsx` as a Server Component
    - Accept `products: ReadonlyArray<Product>` prop, render max 20 ProductCards
    - Responsive grid: single column below 768px, multi-column at 768px+
    - _Requirements: 1.2, 1.4, 1.5, 2.7, 7.1, 7.2, 7.3, 7.4_

  - [x] 6.3 Implement EmptyState component
    - Create `src/components/EmptyState.tsx` as a Server Component
    - Display message "No se encontró ningún producto. Te recomendamos buscar estas categorías."
    - Render first 5 categories as links to `/search?s={category_name}`
    - _Requirements: 3.1, 3.3, 3.4_

  - [x] 6.4 Write unit tests for ProductCard, ProductGrid, and EmptyState
    - Create `src/tests/components/ProductCard.test.tsx` — verify renders image, title, price, and correct link
    - Create `src/tests/components/ProductGrid.test.tsx` — verify renders max 20 cards
    - Create `src/tests/components/EmptyState.test.tsx` — verify message and category links
    - _Requirements: 9.1, 9.4_

  - [x] 6.5 Write property tests for ProductCard and ProductGrid
    - Create `src/tests/properties/product-card.property.test.tsx`
    - **Property 2: ProductCard link contains correct SKU**
    - **Validates: Requirements 1.3**
    - **Property 9: ProductCard renders all required fields**
    - **Validates: Requirements 7.5**
    - Create `src/tests/properties/product-grid.property.test.tsx`
    - **Property 1: ProductGrid never renders more than 20 items**
    - **Validates: Requirements 1.2, 2.7**

  - [x] 6.6 Write property tests for EmptyState
    - Create `src/tests/properties/empty-state.property.test.tsx`
    - **Property 5: EmptyState renders exactly 5 category links**
    - **Validates: Requirements 3.3**
    - **Property 6: Category links navigate to correct search URL**
    - **Validates: Requirements 3.4**

- [x] 7. Checkpoint — Components verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Pages — Home, Search, and Product Detail
  - [x] 8.1 Implement Home page
    - Update `src/app/page.tsx` as Server Component
    - Instantiate `DummyJsonProductRepository`, call `getProducts(20)`
    - Pass products to `ProductGrid`
    - _Requirements: 1.1, 1.2_

  - [x] 8.2 Implement Search page with metadata
    - Create `src/app/search/page.tsx` as Server Component
    - Read `searchParams.s` query parameter
    - Call `searchProducts(query, 20)` from repository
    - If results exist: render total count, query string, and `ProductGrid`
    - If zero results: fetch categories, render `EmptyState` with first 5
    - Export `generateMetadata` returning title `"Resultados para {query}"`
    - _Requirements: 2.4, 2.5, 2.6, 2.7, 3.1, 3.2, 3.3, 6.1_

  - [x] 8.3 Implement Product Detail page with metadata
    - Create `src/app/product/[sku]/page.tsx` as Server Component
    - Call `getProductBySku(params.sku)` from repository
    - If product is null, call `notFound()`
    - Render product image, title, price, category, and description
    - Export `generateMetadata` returning product title and description
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 6.2, 6.3_

  - [x] 8.4 Write property tests for metadata generation
    - Create `src/tests/properties/metadata.property.test.ts`
    - **Property 11: Metadata generation produces correct SEO values**
    - **Validates: Requirements 6.1, 6.2, 6.3**
    - Generate random query strings and products, verify metadata output

  - [x] 8.5 Write property test for search page display
    - Create `src/tests/properties/search-page.property.test.tsx`
    - **Property 4: Search page displays query and total count**
    - **Validates: Requirements 2.5, 2.6**

  - [x] 8.6 Write property test for product detail page
    - Create `src/tests/properties/product-detail.property.test.tsx`
    - **Property 10: Product detail page renders all product information**
    - **Validates: Requirements 4.3**

- [x] 9. Error handling pages
  - [x] 9.1 Create global error boundary
    - Create `src/app/error.tsx` as a Client Component (`"use client"`)
    - Display "Ocurrió un error al cargar los productos." with a retry button
    - _Requirements: 1.6_

  - [x] 9.2 Create not-found pages
    - Create `src/app/not-found.tsx` for global 404
    - Create `src/app/product/[sku]/not-found.tsx` for product-specific 404
    - Include navigation back to home
    - _Requirements: 4.4_

- [x] 10. Checkpoint — Full application verified
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Storybook stories
  - [x] 11.1 Create ProductCard stories
    - Create `src/stories/ProductCard.stories.tsx` in CSF3 format
    - Include variants: default, long title, high price, missing thumbnail
    - _Requirements: 10.1_

  - [x] 11.2 Create SearchBar stories
    - Create `src/stories/SearchBar.stories.tsx` in CSF3 format
    - Include variants: empty, with query text, focused state
    - _Requirements: 10.2_

  - [x] 11.3 Create Header stories
    - Create `src/stories/Header.stories.tsx` in CSF3 format
    - Include variants: default, mobile viewport, desktop viewport
    - _Requirements: 10.3_

  - [x] 11.4 Create EmptyState stories
    - Create `src/stories/EmptyState.stories.tsx` in CSF3 format
    - Include variants: with 5 categories, with fewer categories
    - _Requirements: 10.4_

  - [x] 11.5 Create ProductGrid stories
    - Create `src/stories/ProductGrid.stories.tsx` in CSF3 format
    - Include variants: full grid (20 products), partial grid (5 products), single product, empty
    - _Requirements: 10.5_

- [x] 12. Final quality checks
  - [x] 12.1 Run lint and type check
    - Run `npx eslint .` and fix any linting errors
    - Run `npx tsc --noEmit` and fix any type errors
    - _Requirements: 8.1_

  - [x] 12.2 Verify build succeeds
    - Run `npm run build` and ensure no build errors
    - Verify all pages render without runtime errors
    - _Requirements: 11.1_

- [x] 13. Final checkpoint — All quality gates pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties defined in the design document
- Unit tests validate specific examples and edge cases
- Node.js >= 20.9.0 is required — document in engines field but do not block task execution
- The `@/` path alias is already configured in tsconfig.json
