import IMatch from '../../../resources/match/match.interface';

type inProgressOptions = 'true' | 'false' | undefined;

export default interface IMatchModel {
  findAll(inProgress: inProgressOptions): Promise<IMatch[]>;
}
