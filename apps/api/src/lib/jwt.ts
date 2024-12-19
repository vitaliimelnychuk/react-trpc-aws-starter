import { JWT_SECRET } from '@api/config';
import * as jwt from 'jsonwebtoken';

type JwtPayload = {
  userId: number;
};

export const createJwtToken = ({ userId }: JwtPayload) =>
  jwt.sign({ userId }, JWT_SECRET);
export const verifyJwtToken = (token: string): JwtPayload =>
  jwt.verify(token, JWT_SECRET) as JwtPayload;
