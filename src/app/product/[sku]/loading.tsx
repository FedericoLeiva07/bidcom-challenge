export default function ProductDetailLoading() {
  return (
    <article className="grid gap-8 md:grid-cols-2">
      <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
      <div className="space-y-4">
        <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
        <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="space-y-2 pt-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </article>
  );
}
