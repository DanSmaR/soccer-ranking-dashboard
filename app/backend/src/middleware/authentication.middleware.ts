// import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/token';
import IUserModel from '../utils/interfaces/user/user.model.interface';
import HttpException from '../utils/exceptions/http.exception';

function authenticateMiddleware(userModel: IUserModel): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction): Promise<Response | void> => {
    const token = req.headers.authorization;
    if (!token) throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    const payload = verifyToken(token);
    const user = await userModel.findById(payload.id);
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Unauthorized');
    }
    req.body.user = user;
    return next();
  };
}

export default authenticateMiddleware;
