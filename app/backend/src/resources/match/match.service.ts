import IMatchService from '../../utils/interfaces/match/match.service.interface';
import IMatchModel from '../../utils/interfaces/match/match.model.interface';
import IMatch from './match.interface';

export default class MatchService implements IMatchService {
  constructor(private match: IMatchModel) {}

  public getMatches(inProgress: 'true' | 'false' | undefined): Promise<IMatch[]> {
    return this.match.findAll(inProgress);
  }
}
