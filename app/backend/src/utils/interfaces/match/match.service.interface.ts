import IMatch from '../../../resources/match/match.interface';
import InProgress from './match.inProgress.type';

export default interface IMatchService {
  getMatches(inProgress: InProgress): Promise<IMatch[]>;
  createMatch(newMatch: Omit<IMatch, 'id' | 'inProgress'>): Promise<IMatch>;
  finishMatch(id: number): Promise<number | Error>;
}
