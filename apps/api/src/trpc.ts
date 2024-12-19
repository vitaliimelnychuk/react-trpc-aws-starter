import { verifyJwtToken } from '@api/lib/jwt';
import { logger } from '@api/logger';
import { prisma } from '@reacttrpc-starter/db';
import { initTRPC } from '@trpc/server';
import type { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { ZodError } from 'zod';

const getAuthorizationToken = (authorizationHeader?: string) => {
  if (!authorizationHeader || authorizationHeader.split(' ')[0] !== 'Bearer')
    return false;

  return authorizationHeader.split(' ')[1];
};

const getUser = async (jwtToken?: string) => {
  const token = getAuthorizationToken(jwtToken);

  if (!token) return null;

  try {
    const jwtData = verifyJwtToken(token);

    if (!jwtData) {
      return null;
    }
    const userId = jwtData.userId;

    // TODO: Avoid this query and store user data in JWT context
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true
      }
    });

    if (!currentUser) return null;

    return currentUser;
  } catch {
    return null;
  }
};

export async function createContext({
  event
}: CreateAWSLambdaContextOptions<APIGatewayProxyEvent>) {
  return {
    event,
    user: await getUser(event.headers.authorization)
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
