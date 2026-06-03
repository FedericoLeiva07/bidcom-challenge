import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DummyJsonProductRepository } from '@/infrastructure/repositories/dummyjson-product-repository';

interface ProductPageProps {
  params: Promise<{ sku: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { sku } = await params;
  const repo = new DummyJsonProductRepository();
  const product = await repo.getProductBySku(sku);
  if (!product) return { title: 'Producto no encontrado' };
  return { title: product.title, description: product.description };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { sku } = await params;
  const repo = new DummyJsonProductRepository();
  const product = await repo.getProductBySku(sku);

  if (!product) notFound();

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full rounded-lg object-cover"
      />
      <div>
        <p className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">{product.category}</p>
        <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">{product.title}</h1>
        <p className="mb-6 text-3xl font-extrabold text-bidcom-500 md:text-4xl">${product.price.toFixed(2)}</p>
        <p className="leading-relaxed text-gray-600">{product.description}</p>
      </div>
    </article>
  );
}
