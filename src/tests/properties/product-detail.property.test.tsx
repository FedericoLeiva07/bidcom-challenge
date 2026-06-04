import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import fc from 'fast-check';
import { formatPrice } from '@/lib/format-price';
import { generateProductJsonLd } from '@/lib/jsonld';
import type { Product } from '@/domain/entities/product';

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NOT_FOUND'); },
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const alphaNumArb = (prefix: string) => fc.string({ minLength: 3, maxLength: 50, unit: fc.constantFrom(
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '.split('')
) }).map((s) => s.trim().replace(/\s+/g, ' ')).filter((s) => s.length > 0).map((s) => `${prefix} ${s}`);

const productArb: fc.Arbitrary<Product> = fc.record({
  id: fc.integer({ min: 1, max: 10000 }),
  sku: fc.stringMatching(/^[a-zA-Z0-9\-]{1,20}$/),
  title: alphaNumArb('Title'),
  description: alphaNumArb('Desc'),
  category: alphaNumArb('Cat'),
  price: fc.integer({ min: 100, max: 9999900 }).map((v) => v / 100),
  thumbnail: fc.webUrl(),
});

function mockFetchWithProduct(product: Product | null) {
  const products = product ? [product] : [];
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ products, total: products.length, skip: 0, limit: 0 }),
  }));
}

async function renderProductPage(product: Product) {
  cleanup();
  mockFetchWithProduct(product);
  const { default: ProductDetailPage } = await import('@/app/product/[sku]/page');
  const result = await ProductDetailPage({ params: Promise.resolve({ sku: product.sku }) });
  return render(result);
}

describe('Property Tests: ProductDetailPage', () => {
  it('renderiza título, precio, descripción y categoría del producto', async () => {
    await fc.assert(
      fc.asyncProperty(productArb, async (product) => {
        const { unmount, container } = await renderProductPage(product);

        expect(screen.getByRole('heading', { level: 1, name: product.title })).toBeInTheDocument();
        const article = container.querySelector('article')!;
        expect(article.textContent).toContain(formatPrice(product.price));
        expect(within(article).getByText(product.description)).toBeInTheDocument();
        expect(within(article).getByText(product.category)).toBeInTheDocument();

        unmount();
      }),
      { numRuns: 50 }
    );
  });

  it('renderiza imagen con src y alt correctos', async () => {
    await fc.assert(
      fc.asyncProperty(productArb, async (product) => {
        const { unmount } = await renderProductPage(product);

        const img = screen.getByRole('img', { name: product.title });
        expect(img).toHaveAttribute('src', product.thumbnail);

        unmount();
      }),
      { numRuns: 50 }
    );
  });

  it('genera JSON-LD con los datos del producto', async () => {
    await fc.assert(
      fc.asyncProperty(productArb, async (product) => {
        const { unmount, container } = await renderProductPage(product);

        const script = container.querySelector('script[type="application/ld+json"]');
        expect(script).not.toBeNull();

        const jsonLd = JSON.parse(script!.textContent!);
        const expected = generateProductJsonLd(product);
        expect(jsonLd).toEqual(expected);

        unmount();
      }),
      { numRuns: 50 }
    );
  });

  it('renderiza breadcrumbs con Inicio, categoría y título', async () => {
    await fc.assert(
      fc.asyncProperty(productArb, async (product) => {
        const { unmount } = await renderProductPage(product);

        const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
        expect(nav).toBeInTheDocument();

        const navScope = within(nav);
        const inicioLink = navScope.getByRole('link', { name: 'Inicio' });
        expect(inicioLink).toHaveAttribute('href', '/');

        const categoryLink = navScope.getByRole('link', { name: product.category });
        expect(categoryLink).toHaveAttribute(
          'href',
          `/search?s=${product.category}&cat=${product.category}`
        );

        unmount();
      }),
      { numRuns: 50 }
    );
  });

  it('llama notFound cuando el producto no existe', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 20 }),
        async (sku) => {
          vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ products: [], total: 0, skip: 0, limit: 0 }),
          }));
          const { default: ProductDetailPage } = await import('@/app/product/[sku]/page');

          await expect(
            ProductDetailPage({ params: Promise.resolve({ sku }) })
          ).rejects.toThrow('NOT_FOUND');
        }
      ),
      { numRuns: 50 }
    );
  });
});
