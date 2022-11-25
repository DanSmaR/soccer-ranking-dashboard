import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IController, ILoginData, ILoginService } from '../../utils/interfaces';
import UserService from './user.service';

export default class UserController implements IController {
  public path = '/login';
  public router = Router();

  constructor(private loginService: ILoginService = new UserService()) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.login);
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
}
