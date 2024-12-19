import type { AppRouter } from '@api/trpc';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { API_URL } from '@web/config';

export const trpc = createTRPCReact<AppRouter>();
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const createTRPCClient = (token: string | null) => () => {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: `${API_URL}/trpc`,

        async headers() {
          return {
            authorization: token ? `Bearer ${token}` : ''
          };
        }
      })
    ]
  });
};
