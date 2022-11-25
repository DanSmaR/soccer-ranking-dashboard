import IUser from '../../resources/user/user.interface';

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
