import { ProductGridSkeleton } from '@/components/Skeleton';

export default function SearchLoading() {
  return (
    <section>
      <div className="mb-6">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
      </div>
      <ProductGridSkeleton count={20} />
    </section>
  );
}
