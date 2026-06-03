import Link from 'next/link';
import { Category } from '@/domain/entities/product';

interface EmptyStateProps {
  readonly categories: ReadonlyArray<Category>;
}

export default function EmptyState({ categories }: EmptyStateProps) {
  const displayCategories = categories.slice(0, 5);

  return (
    <div className="flex flex-col items-center py-12 text-center">
      <p className="mb-6 text-lg text-gray-600">
        No se encontró ningún producto. Te recomendamos buscar estas categorías.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {displayCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/search?s=${encodeURIComponent(category.name)}`}
            className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
