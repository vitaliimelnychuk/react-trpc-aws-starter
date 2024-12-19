import { trpc } from '@api/trpc';
import { prisma, User } from '@reacttrpc-starter/db';
import { TRPCError } from '@trpc/server';

type ResponseData = User | null;

export type CurrentUserQueryResponse = ResponseData;

export default trpc.procedure.query(
  async ({ ctx: { user } }): Promise<CurrentUserQueryResponse> => {
    if (!user) return null;

    const data = await prisma.user.findUnique({
      where: {
        id: user.id
      }
    });

    if (!data) throw new TRPCError({ code: 'NOT_FOUND' });

    return data;
  }
);
