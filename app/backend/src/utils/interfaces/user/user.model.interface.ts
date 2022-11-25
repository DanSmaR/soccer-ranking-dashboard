import IUser from '../../../resources/user/user.interface';

export default interface IUserModel {
  findOne(query: Partial<IUser>): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  // isValidUser(email:string, password: string): Promise<boolean>;
}
