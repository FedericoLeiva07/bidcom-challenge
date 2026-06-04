import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renderiza input y botón', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/qué estás buscando/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('navega al presionar Enter', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/qué estás buscando/i);
    fireEvent.change(input, { target: { value: 'laptop' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockPush).toHaveBeenCalledWith('/search?s=laptop');
  });

  it('navega al hacer click en botón Buscar', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/qué estás buscando/i);
    fireEvent.change(input, { target: { value: 'phone' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));
    expect(mockPush).toHaveBeenCalledWith('/search?s=phone');
  });

  it('no navega con query vacío', () => {
    render(<SearchBar />);
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
