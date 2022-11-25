import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';

export default function errorMiddleware(
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong with server';
  res.status(status).json({ message });
}
