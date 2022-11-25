import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/token';
import IUserModel from '../utils/interfaces/user/user.model.interface';
import { IToken } from '../utils/interfaces';
import HttpException from '../utils/exceptions/http.exception';

function authenticateMiddleware(userModel: IUserModel): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction): Promise<Response | void> => {
    const token = req.headers.authorization;
    if (!token) throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid Token');
    const payload: IToken | jwt.JsonWebTokenError = await verifyToken(token);
    if (payload instanceof jwt.JsonWebTokenError) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid Token');
    }
    const user = await userModel.findById(payload.id);
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Unauthorised');
    }
    req.body.user = user;
    return next();
  };
}

export default authenticateMiddleware;
