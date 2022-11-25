import IUser from '../../resources/user/user.interface';

export default interface IUserModel {
  findOne(query: Partial<IUser>): Promise<IUser>;
  create(user: IUser): Promise<IUser>;
  isValidPassword(password: string): Promise<Error | boolean>;
}
