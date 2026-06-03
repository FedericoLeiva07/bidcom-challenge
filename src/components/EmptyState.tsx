import Link from 'next/link';
import { Category } from '@/domain/entities/product';

interface EmptyStateProps {
  readonly categories: ReadonlyArray<Category>;
}

export default function EmptyState({ categories }: EmptyStateProps) {
  const displayCategories = categories.slice(0, 5);

  return (
    <div className="flex flex-col items-center py-12 text-center">
      <p className="mb-2 text-xl font-semibold text-gray-900">No se encontró ningún producto.</p>
      <p className="mb-8 text-gray-500">
        Te recomendamos buscar estas categorías:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {displayCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/search?s=${encodeURIComponent(category.name)}&cat=${encodeURIComponent(category.slug)}`}
            className="rounded-full border border-bidcom-200 bg-bidcom-50 px-5 py-2.5 text-sm font-medium text-bidcom-700 hover:bg-bidcom-100 transition"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
