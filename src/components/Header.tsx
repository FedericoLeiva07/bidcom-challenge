import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bidcom-500 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/">
          <img src="/images/logo_bidcom.svg" alt="Bidcom" width={130} height={40} />
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}
