import IMatch from '../../../resources/match/match.interface';
import InProgress from './match.inProgress.type';

export default interface IMatchService {
  getMatches(inProgress: InProgress): Promise<IMatch[]>;
}
