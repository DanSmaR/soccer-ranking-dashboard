import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import HttpException from '../utils/exceptions/http.exception';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
  return (
    req:Request,
    _res: Response,
    next: NextFunction,
  ): void => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
    }
    req.body = value;
    next();
  };
}

export default validationMiddleware;
