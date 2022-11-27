import IMatch from '../../../resources/match/match.interface';

type inProgressOptions = 'true' | 'false' | 'all';

export default interface IMatchService {
  getMatches(inProgress: inProgressOptions): Promise<IMatch[]>;
}
