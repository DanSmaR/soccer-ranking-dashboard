import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IToken } from './interfaces';
import IUser from '../resources/user/user.interface';

export const createToken = (user: IUser): string => jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET as jwt.Secret,
  { expiresIn: '1d', algorithm: 'HS256' },
);

export const verifyToken = async (
  token: string,
): Promise<jwt.VerifyErrors | IToken> => new Promise((resolve, reject) => {
  jwt.verify(
    token,
    process.env.JWT_SECRET as jwt.Secret,
    (err, payload) => {
      if (err) return reject(err);
      resolve(payload as IToken);
    },
  );
});
