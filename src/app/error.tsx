'use client';

import Image from 'next/image';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Image
        src="/images/illustrations/page_error.svg"
        alt="Error al cargar"
        width={192}
        height={192}
        className="mb-8 h-48 w-48"
      />
      <h2 className="mb-2 text-xl font-bold text-gray-900">Algo salió mal</h2>
      <p className="mb-8 text-gray-500">
        No pudimos cargar los productos. Intentá de nuevo.
      </p>
      <button
        onClick={reset}
        type="button"
        className="rounded-lg bg-bidcom-500 px-8 py-3 font-medium text-white hover:bg-bidcom-600 active:bg-bidcom-700 transition"
      >
        Reintentar
      </button>
    </div>
  );
}
