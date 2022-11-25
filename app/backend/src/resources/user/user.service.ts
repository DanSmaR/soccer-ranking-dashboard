import IUserService from '../../utils/interfaces/user.service.interface';
import { createToken } from '../../utils/token';
import IUserModel from '../../utils/interfaces/user.model.interface';
import UserSequelizeAdapter from './user.sequelize.model';
import IUser from './user.interface';

export default class UserService implements IUserService {
  constructor(private user: IUserModel = new UserSequelizeAdapter()) {}

  public async login(email: string, password: string): Promise<string | Error> {
    async function isValidUser(user: IUser | null) {
      if (user) {
        const isValid = await user.isValidPassword(password, user.password);
        console.log({ isValid });
        return isValid;
      }
      return false;
    }
    const user = await this.user.findOne({ email });
    if (!await isValidUser(user)) throw new Error('Incorrect email or password');
    return createToken(user as IUser);
  }
}
