import { logger } from '@api/logger';
import { initTRPC } from '@trpc/server';
import type { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { ZodError } from 'zod';

export function createContext({
  event
}: CreateAWSLambdaContextOptions<APIGatewayProxyEvent>) {
  return {
    event: event,
    apiVersion: (event as { version?: string }).version ?? '1.0',
    user: event.headers['x-user']
  };
}
type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = initTRPC.context<Context>().create({
  errorFormatter: (err) => {
    logger.error(err.error);
    const { shape, error } = err;
    //TODO:  Remove Error 'stack' in production
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error?.cause
            : null
      }
    };
  }
});
