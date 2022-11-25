import IUserModel from '../../utils/interfaces/user.model.interface';
import UserModel from '../../database/models/UserModel';
import IUser from './user.interface';

export default class UserSequelizeAdapter implements IUserModel {
  private user = UserModel;

  public findOne(query: any): Promise<IUser> {
    return this.user.findOne(query);
  }

  public create(user: any): Promise<IUser> {
    return this.user.create(user);
  }

  public isValidPassword(password: string): Promise<boolean | Error> {
    return this.user.prototype.isValidPassword(password);
  }
}
