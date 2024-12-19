import { expect, jest, test } from '@jest/globals';
import { render } from '@testing-library/react';
import App from '@web/App';
import { act } from 'react';

jest.mock('@web/router/AppRouter', () => ({
  AppRouter: () => (<div>AppRouter</div>) as any
}));

jest.mock('@web/contexts/User', () => ({
  UserContextProvider: ({ children }: { children: any }) => children
}));

jest.mock('@web/contexts/Workspace', () => ({
  WorkspaceContextProvider: ({ children }: { children: any }) => children
}));

jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }: { children: any }) => children
}));

jest.mock('@web/lib/trpc', () => ({
  createTRPCClient: jest.fn(),
  trpc: {
    Provider: ({ children }: { children: any }) => children
  }
}));

jest.mock('@web/utility/localStorage', () => ({
  getJWT: jest.fn()
}));

test('renders learn react link', async () => {
  const { container } = render(<App />);
  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

  const component = container.innerHTML;
  expect(component).toContain('AppRouter');
});
