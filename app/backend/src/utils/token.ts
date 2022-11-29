import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import IUser from '../resources/user/user.interface';
import HttpException from './exceptions/http.exception';

export const createToken = (user: IUser): string => jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET as jwt.Secret,
  { expiresIn: '5m', algorithm: 'HS256' },
);

export const verifyToken = (
  token: string,
): jwt.JwtPayload => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as jwt.Secret,
    ) as jwt.JwtPayload;
    return payload;
  } catch (error) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
  }
};
