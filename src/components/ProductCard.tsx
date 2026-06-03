import Link from 'next/link';

interface ProductCardProps {
  readonly title: string;
  readonly price: number;
  readonly thumbnail: string;
  readonly sku: string;
}

export default function ProductCard({ title, price, thumbnail, sku }: ProductCardProps) {
  return (
    <Link href={`/product/${sku}`} className="group block rounded-lg border border-gray-200 p-4 transition hover:shadow-md">
      <img
        src={thumbnail}
        alt={title}
        className="mb-3 aspect-square w-full rounded-md object-cover"
      />
      <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
        {title}
      </h3>
      <p className="mt-1 text-lg font-bold text-gray-900">
        ${price.toFixed(2)}
      </p>
    </Link>
  );
}
