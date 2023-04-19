import { renderHook } from '@testing-library/react';
import { MediaQueryMatchers, useMediaQuery } from 'react-responsive';

export const testMediaQuery = (query: MediaQueryMatchers) => {
  const { result } = renderHook(() => useMediaQuery(query));
  return result.current;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
