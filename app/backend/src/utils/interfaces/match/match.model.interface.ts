import IMatch from '../../../resources/match/match.interface';
import InProgress from './match.inProgress.type';

export default interface IMatchModel {
  findAll(inProgress: InProgress): Promise<IMatch[]>;
}
