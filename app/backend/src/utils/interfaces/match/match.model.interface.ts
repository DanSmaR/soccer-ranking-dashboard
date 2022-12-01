import IMatch, { ITeamMatch } from '../../../resources/match/match.interface';
import InProgress from './match.inProgress.type';

export default interface IMatchModel {
  findAll(inProgress: InProgress): Promise<(IMatch & ITeamMatch)[]>;
  create(newMatch: Omit<IMatch, 'id' | 'inProgress'>): Promise<IMatch>;
  update(id: number, data: Record<string, any>): Promise<[number]>;
}
