import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bidcom-500 shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-center md:justify-between">
          <Link href="/" className="block">
            <Image src="/images/logo_bidcom.svg" alt="Bidcom" width={130} height={40} />
          </Link>
          <div className="hidden md:block md:flex-1 md:max-w-lg md:ml-8">
            <SearchBar />
          </div>
        </div>
        <div className="mt-3 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
