import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <img
        src="/images/illustrations/page_404.svg"
        alt="Error al cargar"
        className="mb-8 h-48 w-48"
      />
      <p className="mb-8 text-lg text-gray-500">La página que buscás no existe</p>
      <Link href="/" className="rounded-lg bg-bidcom-500 px-8 py-3 font-medium text-white hover:bg-bidcom-600 active:bg-bidcom-700 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
