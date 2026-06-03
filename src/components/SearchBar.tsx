'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?s=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar productos..."
        className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        type="button"
        className="rounded-r-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Buscar
      </button>
    </div>
  );
}
