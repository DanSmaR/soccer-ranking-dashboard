import IUserService from '../../utils/interfaces/user.service.interface';
import { createToken } from '../../utils/token';
import IUserModel from '../../utils/interfaces/user.model.interface';
import UserSequelizeAdapter from './user.sequelize.model';

export default class UserService implements IUserService {
  constructor(private user: IUserModel = new UserSequelizeAdapter()) {}
  
  public async login(email: string, password: string): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email });
      const isValidPassword = await this.user.isValidPassword(password)
      if (!user || !isValidPassword) {
        throw new Error("Incorrect email or password");
      }
      return createToken(user);
    } catch (error) {
      throw new Error('Unable to make login');
    }
  }
}