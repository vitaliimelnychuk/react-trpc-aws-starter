import googleAuth from '@api/procedures/mutations/googleAuth';
import { trpc } from '@api/trpc';

export const appRouter = trpc.router({
  googleAuth
});

export type AppRouter = typeof appRouter;
