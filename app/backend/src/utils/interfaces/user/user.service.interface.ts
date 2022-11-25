export default interface IUserService {
  login(email: string, password: string): Promise<string | Error>;
}
