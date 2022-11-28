import IMatchService from '../../utils/interfaces/match/match.service.interface';
import IMatchModel from '../../utils/interfaces/match/match.model.interface';
import IMatch from './match.interface';
import InProgress from '../../utils/interfaces/match/match.inProgress.type';
import MatchSequelizeAdapter from './match.sequelize.model';

export default class MatchService implements IMatchService {
  constructor(private match: IMatchModel = new MatchSequelizeAdapter()) {}

  public getMatches(inProgress: InProgress): Promise<IMatch[]> {
    return this.match.findAll(inProgress);
  }

  public createMatch(newMatch: Omit<IMatch, 'id' | 'inProgress'>): Promise<IMatch> {
    return this.match.create(newMatch);
  }
}
