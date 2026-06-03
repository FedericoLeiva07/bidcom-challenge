import type { Metadata } from 'next';
import { DummyJsonProductRepository } from '@/infrastructure/repositories/dummyjson-product-repository';
import ProductGrid from '@/components/ProductGrid';
import EmptyState from '@/components/EmptyState';

interface SearchPageProps {
  searchParams: Promise<{ s?: string; cat?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  return { title: `Resultados para ${params.s ?? ''}` };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.s ?? '';
  const categorySlug = params.cat;
  const repo = new DummyJsonProductRepository();

  let products;
  let total: number;

  if (categorySlug) {
    products = await repo.getProductsByCategory(categorySlug);
    total = products.length;
  } else {
    const result = await repo.searchProducts(query, 20);
    products = result.products;
    total = result.total;
  }

  if (products.length === 0) {
    const categories = await repo.getCategories();
    return <EmptyState categories={categories.slice(0, 5)} />;
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resultados para &quot;{query}&quot;</h1>
        <p className="mt-1 text-sm text-gray-500">{total} productos encontrados</p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
