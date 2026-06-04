---
inclusion: fileMatch
fileMatchPattern: "**/*.stories.{ts,tsx}"
---

# Storybook Guide

## Setup

- Storybook 8+ con framework Next.js
- Stories en `src/stories/`
- Formato CSF3 (Component Story Format 3)

## Stories Requeridos

| Componente | Variantes |
|------------|-----------|
| ProductCard | Default, Long Title, High Price |
| SearchBar | Empty, With Value |
| Header | Default |
| EmptyState | With Categories |
| ProductGrid | Few Items, Full Grid, Loading |

## Estructura de un Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@/components/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // props
  },
};
```

## Datos de Ejemplo

Usar datos realistas basados en la estructura de DummyJSON:

```ts
const mockProduct = {
  id: 1,
  sku: 'RCH45Q1A',
  title: 'Essence Mascara Lash Princess',
  description: 'Popular mascara known for length and volume.',
  category: 'beauty',
  price: 9.99,
  thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
};
```

## Responsive

Usar el addon `@storybook/addon-viewport` para previsualizar en breakpoints:
- Mobile (375px)
- Tablet (768px)
- Desktop (1024px)
