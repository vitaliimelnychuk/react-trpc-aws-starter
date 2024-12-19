import { appRouter } from '@api/router';
import { createContext } from '@api/trpc';
import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext
});
