import { StatusCodes } from 'http-status-codes';
import IUserService from '../../utils/interfaces/user/user.service.interface';
import { createToken } from '../../utils/token';
import IUserModel from '../../utils/interfaces/user/user.model.interface';
import UserSequelizeAdapter from './user.sequelize.model';
import HttpException from '../../utils/exceptions/http.exception';
import IUser from './user.interface';

export default class UserService implements IUserService {
  constructor(private user: IUserModel = new UserSequelizeAdapter()) {}

  public async login(email: string, password: string): Promise<string | Error> {
    async function isValidUser(user: IUser | null) {
      if (user) {
        return user.isValidPassword(password, user.password);
      }
      return false;
    }
    const user = await this.user.findOne({ email });
    if (!await isValidUser(user)) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Incorrect email or password');
    }
    return createToken(user as IUser);
  }
}
