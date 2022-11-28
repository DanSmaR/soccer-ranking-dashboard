import IMatch from '../../../resources/match/match.interface';

type inProgressOptions = 'true' | 'false' | undefined;

export default interface IMatchService {
  getMatches(inProgress: inProgressOptions): Promise<IMatch[]>;
}
