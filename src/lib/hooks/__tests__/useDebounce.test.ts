import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'changed', delay: 500 });

    // Value should not have changed yet
    expect(result.current).toBe('initial');

    // Fast forward time
    vi.advanceTimersByTime(500);

    // Now the value should have changed
    expect(result.current).toBe('changed');
  });

  it('cancels previous timer on new value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change value multiple times
    rerender({ value: 'changed1', delay: 500 });
    vi.advanceTimersByTime(200);

    rerender({ value: 'changed2', delay: 500 });
    vi.advanceTimersByTime(200);

    // Value should not have changed yet
    expect(result.current).toBe('initial');

    // Complete the delay
    vi.advanceTimersByTime(300);

    // Should have the latest value
    expect(result.current).toBe('changed2');
  });
});