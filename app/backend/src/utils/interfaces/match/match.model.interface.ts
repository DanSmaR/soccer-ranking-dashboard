import IMatch from '../../../resources/match/match.interface';
import InProgress from './match.inProgress.type';

export default interface IMatchModel {
  findAll(inProgress: InProgress): Promise<IMatch[]>;
  create(newMatch: Omit<IMatch, 'id' | 'inProgress'>): Promise<IMatch>;
  update(id: number): Promise<[number]>;
}
