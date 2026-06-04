# Bidcom E-Commerce Challenge

Aplicación e-commerce construida con **Next.js 16**, **React 19** y **TypeScript** que replica, a muy bajo nivel visualmente, el sitio de [Bidcom](https://www.bidcom.com.ar), consumiendo datos desde la API pública de [DummyJSON](https://dummyjson.com).

Proyecto desarrollado íntegramente con [Kiro](https://kiro.dev) como entorno de desarrollo AI-assisted, utilizando specs, steering, hooks, skills y agentes personalizados.

---

## Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Setup](#instalación-y-setup)
- [Scripts Disponibles](#scripts-disponibles)
- [Arquitectura](#arquitectura)
- [Funcionalidades](#funcionalidades)
- [Testing](#testing)
- [Storybook](#storybook)
- [Desarrollo con Kiro](#desarrollo-con-kiro)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | >= 20.9.0 | Runtime |
| Next.js | 16.2.7 | Framework (App Router) |
| React | 19.2.4 | UI Library |
| TypeScript | 5.x | Lenguaje (strict mode) |
| Tailwind CSS | 4.x | Estilos (Mobile First) |
| Vitest | 4.x | Test runner |
| React Testing Library | 16.x | Testing de componentes |
| fast-check | 4.x | Property-based testing |
| Storybook | 10.x | Documentación visual de componentes |
| ESLint | 9.x | Linting |
| Prettier | 3.x | Formatting |

---

## Requisitos Previos

- **Node.js >= 20.9.0** (el proyecto usa `.nvmrc` con Node 22)
- **npm** (incluido con Node.js)

### Instalación de Node.js

Si usás [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install
nvm use
```

O descargá Node.js 22 desde [nodejs.org](https://nodejs.org/).

---

## Instalación y Setup

```bash
# Clonar el repositorio
git clone https://github.com/FedericoLeiva07/bidcom-challenge.git
cd bidcom-challenge

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Dev server | `npm run dev` | Servidor de desarrollo con hot reload |
| Build | `npm run build` | Build de producción |
| Start | `npm run start` | Servidor de producción |
| Tests | `npm run test` | Ejecuta tests una vez |
| Tests (watch) | `npm run test:watch` | Tests en modo watch |
| Coverage | `npm run test:coverage` | Tests con reporte de cobertura |
| Lint | `npm run lint` | Ejecuta ESLint |
| Format | `npm run format` | Formatea código con Prettier |
| Storybook | `npm run storybook` | Inicia Storybook en puerto 6006 |
| Build Storybook | `npm run build-storybook` | Build estático de Storybook |

---

## Arquitectura

El proyecto sigue principios de **Clean Architecture** y **SOLID**, con separación estricta entre capas:

```
src/
├── app/                    # Next.js App Router (páginas y layouts)
├── domain/                 # Entidades y contratos (interfaces puras)
│   ├── entities/           # Product, Category, SearchResult
│   └── repositories/       # IProductRepository (interface)
├── infrastructure/         # Implementaciones concretas
│   ├── repositories/       # DummyJsonProductRepository
│   └── types/              # Tipos de la API externa
├── components/             # Componentes React reutilizables
├── lib/                    # Utilidades compartidas
├── stories/                # Storybook stories
└── tests/                  # Tests unitarios y property-based
```

### Reglas de Dependencia

```
app/ → components/ → domain/
                   → lib/
infrastructure/ → domain/
app/ → infrastructure/ (solo inyección)
```

- `domain/` NO depende de nada externo
- `infrastructure/` implementa interfaces de `domain/`
- `components/` reciben datos vía props, nunca hacen fetch
- `app/` pages orquestan: obtienen datos y los pasan a componentes

### Server vs Client Components

| Componente | Tipo | Razón |
|-----------|------|-------|
| Pages, Layout | Server | Fetch de datos, sin interactividad |
| Header, ProductCard, ProductGrid, EmptyState, Footer | Server | Renderizado puro de datos |
| SearchBar | **Client** | `useState` + `useRouter` para interacción |
| error.tsx | **Client** | Requiere manejo de estado de error |

---

## Funcionalidades

### Home (`/`)
- Grid responsive de hasta 20 productos
- 1 columna mobile, 2 tablet, 4 desktop
- Click en producto → `/product/{sku}`

### Búsqueda (`/search?s={query}`)
- Búsqueda via API de DummyJSON
- Muestra cantidad de resultados y término buscado
- Máximo 20 resultados
- Estado vacío con 5 categorías sugeridas

### Detalle de Producto (`/product/[sku]`)
- Acceso por SKU (fetch all + filter server-side)
- Muestra imagen, título, precio, categoría y descripción
- 404 si el SKU no existe

### SEO
- Metadata dinámica con `generateMetadata`
- Títulos descriptivos por página
- JSON-LD para productos

### Manejo de Errores
- `error.tsx` global con mensaje en español
- `not-found.tsx` para 404
- Página 404 específica para producto inexistente

---

## Testing

### Tipos de Tests

**Unit Tests** (example-based):
- Componentes: ProductCard, SearchBar, Header, ProductGrid, EmptyState
- Infraestructura: DummyJsonProductRepository

**Property Tests** (fast-check, 100+ iteraciones):
- ProductGrid nunca renderiza más de 20 items
- ProductCard link contiene SKU correcto
- SearchBar navega a URL correcta
- EmptyState renderiza exactamente 5 categorías
- Repository SKU lookup retorna resultado correcto
- Metadata genera valores SEO correctos

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Con cobertura
npm run test:coverage

# En modo watch
npm run test:watch
```

---

## Storybook

Documentación visual interactiva de todos los componentes UI:

```bash
npm run storybook
```

Abrí [http://localhost:6006](http://localhost:6006).

### Stories incluidos

| Componente | Variantes |
|-----------|-----------|
| ProductCard | Default, Long Title, High Price |
| SearchBar | Empty, With Value |
| Header | Default |
| EmptyState | With Categories |
| ProductGrid | Few Items, Full Grid, Single, Empty |

---

## Desarrollo con Kiro

Este proyecto fue desarrollado utilizando las capacidades de [Kiro](https://kiro.dev) como IDE AI-assisted. A continuación se detalla todo lo configurado.

### Spec (Especificación Estructurada)

El spec del proyecto está en `.kiro/specs/bidcom-ecommerce/` y contiene:

| Archivo | Contenido |
|---------|-----------|
| `requirements.md` | 11 requerimientos con user stories y criterios de aceptación |
| `design.md` | Documento de diseño con diagramas de arquitectura, data flow, componentes, modelos de datos, propiedades de correctitud y estrategia de testing |
| `tasks.md` | Plan de implementación con 13 épicas y ~30 tareas individuales, todas completadas ✅ |

### Steering (Guías de Contexto)

Archivos en `.kiro/steering/` que proveen contexto automático al agente:

| Archivo | Inclusión | Propósito |
|---------|-----------|-----------|
| `project-overview.md` | Always | Resumen del proyecto, stack, API, rutas |
| `architecture.md` | Always | Principios SOLID, estructura, reglas de dependencia |
| `coding-standards.md` | Always | Convenciones TypeScript, React, Tailwind, naming |
| `component-patterns.md` | File match (`src/components/**`) | Patrones de componentes, checklist |
| `api-integration.md` | File match (`src/infrastructure/**`) | Guía de integración DummyJSON, endpoints, mapeo |
| `seo-metadata.md` | File match (`src/app/**/page.tsx`) | Patrones de metadata dinámica |
| `testing-strategy.md` | File match (`**/*.test.*`) | Framework, cobertura, patrones de test |
| `storybook-guide.md` | File match (`**/*.stories.*`) | Formato CSF3, datos de ejemplo |

### Hooks (Automatizaciones del Agente)

Hooks en `.kiro/hooks/` que automatizan validaciones:

| Hook | Evento | Acción | Descripción |
|------|--------|--------|-------------|
| `architecture-check` | `preToolUse` (write) | askAgent | Verifica que cada escritura respete Clean Architecture |
| `lint-on-save` | `fileEdited` (*.ts, *.tsx) | runCommand | Ejecuta ESLint --fix al editar archivos |
| `test-after-task` | `postTaskExecution` | runCommand | Corre Vitest después de cada tarea del spec |
| `build-check-stop` | `agentStop` | runCommand | Build de Next.js al detenerse el agente |
| `ux-ui-review` | `userTriggered` | askAgent | Review UX/UI completo (colores, layout, tipografía) |

### Skills (Agentes Especializados)

Skills en `.kiro/skills/` invocables manualmente desde el chat:

| Skill | Descripción |
|-------|-------------|
| `frontend-architect` | Valida Clean Architecture, SOLID, dependencias entre capas |
| `api-integration` | Implementa y valida integraciones con DummyJSON |
| `nextjs-ssr` | Optimiza Server Components, metadata, caching |
| `testing` | Escribe tests unitarios y de integración con Vitest |
| `storybook` | Crea stories CSF3 con variantes y datos realistas |
| `ui-design-system` | Design system, accesibilidad, responsive, tokens |
| `performance` | Core Web Vitals, bundle size, imágenes, caching |
| `reviewer` | Evalúa el proyecto como si fuera el equipo evaluador de Bidcom |

---

## Estructura del Proyecto

```
bidcom-challenge/
├── .kiro/
│   ├── hooks/                    # Automatizaciones del agente
│   ├── skills/                   # Agentes especializados
│   ├── specs/bidcom-ecommerce/   # Spec completo (requirements, design, tasks)
│   └── steering/                 # Guías de contexto para el agente
├── .storybook/                   # Configuración Storybook
├── public/
│   └── images/                   # SVGs e ilustraciones
├── src/
│   ├── app/                      # Páginas y layouts (App Router)
│   │   ├── page.tsx              # Home
│   │   ├── layout.tsx            # Layout raíz
│   │   ├── error.tsx             # Error boundary global
│   │   ├── not-found.tsx         # 404 global
│   │   ├── search/page.tsx       # Búsqueda
│   │   └── product/[sku]/        # Detalle de producto
│   ├── components/               # UI components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── Skeleton.tsx
│   ├── domain/
│   │   ├── entities/product.ts   # Product, Category, SearchResult
│   │   └── repositories/         # IProductRepository interface
│   ├── infrastructure/
│   │   ├── repositories/         # DummyJsonProductRepository
│   │   └── types/                # Tipos raw de la API
│   ├── lib/                      # Utilidades (format-price, jsonld)
│   ├── stories/                  # Storybook stories
│   └── tests/
│       ├── components/           # Unit tests de componentes
│       ├── infrastructure/       # Unit tests del repository
│       └── properties/           # Property-based tests (fast-check)
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
└── spec-kiro-bidcom.md           # Spec original del challenge
```

---

## API de Datos

La aplicación consume la API pública de DummyJSON:

| Endpoint | Uso |
|----------|-----|
| `GET /products?limit=20` | Home page |
| `GET /products/search?q={query}&limit=20` | Búsqueda |
| `GET /products?limit=0` | Todos (búsqueda por SKU) |
| `GET /products/categories` | Categorías sugeridas |

---

## Licencia

Proyecto desarrollado como evaluación técnica frontend.
