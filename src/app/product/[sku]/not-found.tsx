import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">404</h1>
      <p className="mb-6 text-lg text-gray-600">Producto no encontrado</p>
      <Link href="/" className="rounded-lg bg-bidcom-500 px-8 py-3 font-medium text-white hover:bg-bidcom-600 active:bg-bidcom-700 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
