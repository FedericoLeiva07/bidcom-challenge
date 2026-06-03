import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { DummyJsonProductRepository } from '@/infrastructure/repositories/dummyjson-product-repository';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateProductJsonLd } from '@/lib/jsonld';
import { formatPrice } from '@/lib/format-price';

interface ProductPageProps {
  params: Promise<{ sku: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { sku } = await params;
  const repo = new DummyJsonProductRepository();
  const product = await repo.getProductBySku(sku);
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.thumbnail }],
      type: 'article',
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { sku } = await params;
  const repo = new DummyJsonProductRepository();
  const product = await repo.getProductBySku(sku);

  if (!product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductJsonLd(product)) }}
      />
      <Breadcrumbs items={[
        { label: 'Inicio', href: '/' },
        { label: product.category, href: `/search?s=${product.category}&cat=${product.category}` },
        { label: product.title },
      ]} />
      <article className="grid gap-8 md:grid-cols-2">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          unoptimized
          className="w-full rounded-lg object-cover"
        />
        <div>
          <p className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">{product.category}</p>
          <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">{product.title}</h1>
          <p className="mb-6 text-3xl font-extrabold text-bidcom-500 md:text-4xl">{formatPrice(product.price)}</p>
          <p className="leading-relaxed text-gray-600">{product.description}</p>
        </div>
      </article>
    </>
  );
}
