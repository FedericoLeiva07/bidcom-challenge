import { Suspense } from 'react';
import { DummyJsonProductRepository } from '@/infrastructure/repositories/dummyjson-product-repository';
import ProductGrid from '@/components/ProductGrid';
import { ProductGridSkeleton } from '@/components/Skeleton';

async function HomeProducts() {
  const repo = new DummyJsonProductRepository();
  const products = await repo.getProducts(20);
  return <ProductGrid products={products} />;
}

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Lo más buscado</h1>
      <Suspense fallback={<ProductGridSkeleton count={20} />}>
        <HomeProducts />
      </Suspense>
    </section>
  );
}
