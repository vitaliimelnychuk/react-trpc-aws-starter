export * from '@api/prisma';
import { PrismaClient } from '@api/prisma';

export const prisma = new PrismaClient({});
