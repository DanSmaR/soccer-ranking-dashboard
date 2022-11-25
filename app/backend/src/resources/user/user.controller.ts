import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../../utils/exceptions/http.exception';
import authenticateMiddleware from '../../middleware/authentication.middleware';
import validationMiddleware from '../../middleware/validation.middleware';
import { IController, ILoginData, ILoginService } from '../../utils/interfaces';
import UserSequelizeAdapter from './user.sequelize.model';
import UserService from './user.service';
import loginSchema from './user.validation';
import IUser from './user.interface';

export default class UserController implements IController {
  public path = '/login';
  public router = Router();

  constructor(private loginService: ILoginService = new UserService()) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, validationMiddleware(loginSchema), this.login);
    this.router.get(
      `${this.path}/validate`,
      authenticateMiddleware(new UserSequelizeAdapter()),
      this.getRole,
    );
  }

  private login = async (
    req: Request<unknown, unknown, ILoginData>,
    res: Response,
    _next: NextFunction,
  ): Promise<Response | void> => {
    const { email, password } = req.body;
    const token = await this.loginService.login(email, password);
    res.status(StatusCodes.OK).json({ token });
  };

  private getRole = (
    req: Request<unknown, unknown, { user: Omit<IUser, 'password'> }>,
    res: Response,
    _next: NextFunction,
  ): Response | void => {
    if (!req.body.user) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'No logged in user');
    }
    res.status(200).json({ role: req.body.user.role });
  };
}
