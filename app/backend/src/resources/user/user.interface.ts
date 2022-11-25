export type roles = 'admin' | 'user';

export default interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
  isValidPassword(password: string, hash: string): Promise<boolean>;
}
