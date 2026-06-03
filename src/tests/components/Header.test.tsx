import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('Header', () => {
  it('renderiza el logo con link a home', () => {
    render(<Header />);
    const logo = screen.getByRole('link', { name: /bidcom/i });
    expect(logo).toHaveAttribute('href', '/');
  });

  it('contiene el SearchBar', () => {
    render(<Header />);
    expect(screen.getByPlaceholderText(/buscar productos/i)).toBeInTheDocument();
  });
});
