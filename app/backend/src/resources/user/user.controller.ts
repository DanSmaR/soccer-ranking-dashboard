import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authenticateMiddleware, validationMiddleware } from '../../middleware';
import { IController } from '../../utils/interfaces';
import { ILoginData, IUserService } from '../../utils/interfaces/user';
import UserSequelizeAdapter from './user.sequelize.model';
import UserService from './user.service';
import loginSchema from './user.validation';
import IUser from './user.interface';

export default class UserController implements IController {
  private _path = '/login';
  private _router = Router();

  constructor(private loginService: IUserService = new UserService()) {
    this.initializeRoutes();
  }

  get path() {
    return this._path;
  }

  get router() {
    return this._router;
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
    res.status(200).json({ role: req.body.user.role });
  };
}
