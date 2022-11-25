import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IController, ILoginData, ILoginService } from '../../utils/interfaces';
import HttpException from '../../utils/exceptions/http.exception';
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
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const token = await this.loginService.login(email, password);
      res.status(StatusCodes.OK).json({ token });
    } catch (error: any) {
      console.log(error);
      next(new HttpException(StatusCodes.BAD_REQUEST, error.message));
    }
  };
}
