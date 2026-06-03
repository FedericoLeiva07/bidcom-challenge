import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Bidcom
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}
