import '@testing-library/jest-dom';

// Mock dayjs if needed
jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual('dayjs');
  const mockDayjs = (date) => originalDayjs(date || '2025-01-15');
  Object.setPrototypeOf(mockDayjs, originalDayjs);
  return mockDayjs;
});

// Global test utilities
global.mockDate = (date = '2025-01-15') => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(date));
};

global.restoreDate = () => {
  jest.useRealTimers();
};