import IMatch from '../../../resources/match/match.interface';

type inProgressOptions = 'true' | 'false' | 'all';

export default interface IMatchModel {
  findAll(inProgress: inProgressOptions): Promise<IMatch[]>;
}
