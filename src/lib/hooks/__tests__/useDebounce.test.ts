import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

interface DebounceProps {
  value: string | number;
  delay: number;
}

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook<string, DebounceProps>(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 500 }
      }
    );

    expect(result.current).toBe('test');
  });

  it('should update value after delay', () => {
    const { result, rerender } = renderHook<string, DebounceProps>(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 500 }
      }
    );

    // Additional test logic...
  });
});