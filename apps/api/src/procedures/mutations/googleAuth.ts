import {
  fetchImageAsBase64,
  getCredentialsByCode,
  getTokenInfo
} from '@api/lib/google';
import { createJwtToken } from '@api/lib/jwt';
import { trpc } from '@api/trpc';
import { prisma } from '@reacttrpc-starter/db';
import { TRPCError } from '@trpc/server';
import { Credentials } from 'google-auth-library';
import { z } from 'zod';

const input = z.object({
  code: z.string()
});

export default trpc.procedure
  .input(input)
  .mutation(async ({ input }): Promise<string> => {
    const credentials: Credentials = await getCredentialsByCode(input.code);
    const user = await getTokenInfo(credentials);

    const avatar = await fetchImageAsBase64(user.avatar);

    const userDB = await prisma.user.upsert({
      where: {
        email: user.email
      },
      update: {
        name: user.name ?? user.email
      },
      create: {
        email: user.email,
        name: user.name ?? user.email,
        isActive: true,
        avatar
      }
    });

    if (!userDB) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not found'
      });
    }

    if (!userDB.isActive) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User is not active please contact your administrator'
      });
    }

    const jwt = createJwtToken({
      userId: userDB.id
    });

    return jwt;
  });
