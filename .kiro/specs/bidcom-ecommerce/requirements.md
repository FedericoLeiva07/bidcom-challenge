# Requirements Document

## Introduction

Aplicación e-commerce frontend que replica visualmente el sitio de Bidcom, construida con Next.js 16 (App Router), React 19, TypeScript (strict mode) y Tailwind CSS 4. La aplicación consume datos desde la API pública de DummyJSON y presenta un catálogo de productos con funcionalidad de búsqueda y detalle por SKU.

## Glossary

- **Application**: La aplicación e-commerce Bidcom construida con Next.js 16
- **Home_Page**: La página principal que muestra un grid de productos
- **Search_Page**: La página de resultados de búsqueda accesible en `/search?s={query}`
- **Product_Detail_Page**: La página de detalle de un producto accesible en `/product/[sku]`
- **Product_Repository**: Módulo de infraestructura que implementa las llamadas a la API DummyJSON
- **DummyJSON_API**: API pública en `https://dummyjson.com` que provee datos de productos
- **ProductCard**: Componente que muestra imagen, nombre y precio de un producto
- **ProductGrid**: Componente que renderiza una grilla responsive de ProductCards
- **SearchBar**: Componente cliente que permite al usuario ingresar un término de búsqueda
- **Header**: Componente que contiene el logo y el SearchBar
- **EmptyState**: Componente que muestra un mensaje y categorías sugeridas cuando no hay resultados
- **SKU**: Stock Keeping Unit, identificador único de producto usado en la URL
- **Server_Component**: Componente de React que se renderiza en el servidor por defecto
- **Client_Component**: Componente de React que se renderiza en el cliente, marcado con `"use client"`

## Requirements

### Requirement 1: Home Page Product Display

**User Story:** As a visitor, I want to see a grid of products on the home page, so that I can browse the available catalog.

#### Acceptance Criteria

1. WHEN the Home_Page loads, THE Application SHALL fetch products from `GET /products?limit=20`
2. THE Home_Page SHALL display a maximum of 20 products in a responsive ProductGrid
3. WHEN a visitor clicks on a ProductCard, THE Application SHALL navigate to `/product/{sku}` where `{sku}` is the SKU of the selected product
4. WHILE the viewport width is less than 768px, THE ProductGrid SHALL render products in a single-column layout
5. WHILE the viewport width is 768px or greater, THE ProductGrid SHALL render products in a multi-column layout
6. IF the DummyJSON_API returns an error, THEN THE Home_Page SHALL display the message "Ocurrió un error al cargar los productos."

### Requirement 2: Search Functionality

**User Story:** As a visitor, I want to search for products by name, so that I can find specific items quickly.

#### Acceptance Criteria

1. THE SearchBar SHALL render a text input and a search button
2. WHEN the visitor presses Enter in the SearchBar input, THE Application SHALL navigate to `/search?s={query}` where `{query}` is the entered text
3. WHEN the visitor clicks the search button, THE Application SHALL navigate to `/search?s={query}` where `{query}` is the entered text
4. WHEN the Search_Page loads with a query parameter, THE Product_Repository SHALL fetch results from `GET /products/search?q={query}&limit=20`
5. THE Search_Page SHALL display the total count of results returned by the API
6. THE Search_Page SHALL display the search term used in the query
7. THE Search_Page SHALL render matching products in a responsive ProductGrid limited to 20 items

### Requirement 3: Empty Search Results

**User Story:** As a visitor, I want to see category suggestions when my search has no results, so that I can discover alternative products.

#### Acceptance Criteria

1. WHEN the Search_Page receives zero results from the DummyJSON_API, THE EmptyState SHALL display the message "No se encontró ningún producto. Te recomendamos buscar estas categorías."
2. WHEN the EmptyState is displayed, THE Product_Repository SHALL fetch categories from `GET /products/categories`
3. THE EmptyState SHALL display the first 5 categories as clickable links
4. WHEN a visitor clicks a category link, THE Application SHALL navigate to `/search?s={category_name}`

### Requirement 4: Product Detail Page

**User Story:** As a visitor, I want to view product details by SKU, so that I can see full information before making a purchase decision.

#### Acceptance Criteria

1. WHEN the Product_Detail_Page loads, THE Product_Repository SHALL fetch all products from `GET /products?limit=0`
2. THE Product_Repository SHALL find the product matching the SKU from the URL parameter
3. THE Product_Detail_Page SHALL display the product image, title, price, category, and description
4. IF the Product_Repository does not find a product matching the given SKU, THEN THE Application SHALL return a 404 Not Found response using `notFound()`

### Requirement 5: Header Component

**User Story:** As a visitor, I want a persistent header with navigation and search, so that I can navigate and search from any page.

#### Acceptance Criteria

1. THE Header SHALL display the Bidcom logo
2. WHEN the visitor clicks the logo, THE Application SHALL navigate to the Home_Page at `/`
3. THE Header SHALL contain the SearchBar component
4. THE Header SHALL be visible on all pages of the Application

### Requirement 6: SEO Metadata

**User Story:** As a site owner, I want dynamic metadata on search and product pages, so that search engines can properly index the content.

#### Acceptance Criteria

1. WHEN the Search_Page renders, THE Application SHALL set the page title to "Resultados para {query}" where `{query}` is the search term
2. WHEN the Product_Detail_Page renders, THE Application SHALL set the page title to the product title
3. WHEN the Product_Detail_Page renders, THE Application SHALL set the meta description to the product description

### Requirement 7: Responsive Design

**User Story:** As a visitor, I want the application to adapt to different screen sizes, so that I can use it comfortably on any device.

#### Acceptance Criteria

1. THE Application SHALL use a Mobile First design approach where base styles target mobile viewports
2. WHILE the viewport width is less than 768px, THE Application SHALL render a mobile-optimized layout
3. WHILE the viewport width is 768px or greater and less than 1024px, THE Application SHALL render a tablet-optimized layout
4. WHILE the viewport width is 1024px or greater, THE Application SHALL render a desktop-optimized layout
5. THE ProductCard SHALL display the product thumbnail, product name, and product price

### Requirement 8: Architecture and Code Quality

**User Story:** As a developer, I want a clean architecture with proper separation of concerns, so that the codebase is maintainable and testable.

#### Acceptance Criteria

1. THE Application SHALL use TypeScript in strict mode with no usage of the `any` type
2. THE Application SHALL separate domain entities and repository interfaces from infrastructure implementations
3. THE Application SHALL use Server_Components by default for pages and data-displaying components
4. THE Application SHALL use Client_Components only for components requiring user interactivity
5. THE Product_Repository interface SHALL be defined in the domain layer independent of the DummyJSON_API implementation
6. THE infrastructure layer SHALL implement the Product_Repository interface to call the DummyJSON_API

### Requirement 9: Testing Coverage

**User Story:** As a developer, I want unit tests for critical components and modules, so that I can verify correctness and prevent regressions.

#### Acceptance Criteria

1. THE ProductCard test suite SHALL verify that the component renders the product title, price, and image
2. THE SearchBar test suite SHALL verify that the component renders an input field and triggers navigation on search
3. THE Product_Repository test suite SHALL verify that searchProducts, getProductBySku, and getCategories functions return correct results
4. THE empty results test suite SHALL verify that the EmptyState displays the required message and category links

### Requirement 10: Storybook Documentation

**User Story:** As a developer, I want visual documentation of UI components, so that I can review and develop them in isolation.

#### Acceptance Criteria

1. THE Application SHALL include a Storybook story for the ProductCard component
2. THE Application SHALL include a Storybook story for the SearchBar component
3. THE Application SHALL include a Storybook story for the Header component
4. THE Application SHALL include a Storybook story for the EmptyState component
5. THE Application SHALL include a Storybook story for the ProductGrid component

### Requirement 11: Node.js Version Prerequisite

**User Story:** As a developer, I want to ensure the runtime meets the minimum version requirement, so that the application can build and run correctly.

#### Acceptance Criteria

1. THE Application SHALL require Node.js version 20.9.0 or higher to build and run
2. THE Application SHALL specify the required Node.js version in the `engines` field of `package.json`
