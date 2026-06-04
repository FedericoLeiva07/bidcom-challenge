import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import fc from 'fast-check';
import SearchBar from '@/components/SearchBar';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('Property Tests: SearchBar', () => {
  it('navega a /search?s={query} para cualquier query no vacío', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
        (query) => {
          mockPush.mockClear();
          const { unmount } = render(<SearchBar />);
          const input = screen.getByPlaceholderText(/qué estás buscando/i);
          fireEvent.change(input, { target: { value: query } });
          fireEvent.keyDown(input, { key: 'Enter' });
          expect(mockPush).toHaveBeenCalledWith(`/search?s=${encodeURIComponent(query.trim())}`);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
