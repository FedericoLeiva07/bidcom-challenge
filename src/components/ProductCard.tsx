import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/format-price';

interface ProductCardProps {
  readonly title: string;
  readonly price: number;
  readonly thumbnail: string;
  readonly sku: string;
}

export default function ProductCard({ title, price, thumbnail, sku }: ProductCardProps) {
  return (
    <Link href={`/product/${sku}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gray-50 p-4">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={300}
          unoptimized
          className="aspect-square w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between px-4 pb-4 pt-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-gray-800 group-hover:text-bidcom-500 transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-2xl font-extrabold text-gray-900">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}
