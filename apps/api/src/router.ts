import googleAuth from '@api/procedures/mutations/googleAuth';
import currentUser from '@api/procedures/queries/currentUser';
import { trpc } from '@api/trpc';

const mutations = {
  googleAuth
};

const queries = {
  currentUser
};

export const appRouter = trpc.router({
  ...mutations,
  ...queries
});

export type AppRouter = typeof appRouter;
