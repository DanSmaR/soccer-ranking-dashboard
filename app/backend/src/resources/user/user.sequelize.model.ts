import IUserModel from '../../utils/interfaces/user.model.interface';
import UserModel from '../../database/models/UserModel';
import IUser from './user.interface';

export default class UserSequelizeAdapter implements IUserModel {
  private user = UserModel;

  public findOne(query: Record<string, string>): Promise<IUser | null> {
    return this.user.findOne({ where: query });
  }

  public create(user: Omit<IUser, 'id' | 'isValidPassword'>): Promise<IUser> {
    return this.user.create(user);
  }
}
