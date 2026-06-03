import { DummyJsonProductRepository } from '@/infrastructure/repositories/dummyjson-product-repository';
import ProductGrid from '@/components/ProductGrid';

export default async function HomePage() {
  const repo = new DummyJsonProductRepository();
  const products = await repo.getProducts(20);

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Lo más buscado</h1>
      <ProductGrid products={products} />
    </section>
  );
}
