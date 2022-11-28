import { StatusCodes } from 'http-status-codes';
import IMatchService from '../../utils/interfaces/match/match.service.interface';
import IMatchModel from '../../utils/interfaces/match/match.model.interface';
import IMatch from './match.interface';
import InProgress from '../../utils/interfaces/match/match.inProgress.type';
import MatchSequelizeAdapter from './match.sequelize.model';
import HttpException from '../../utils/exceptions/http.exception';

export default class MatchService implements IMatchService {
  constructor(private match: IMatchModel = new MatchSequelizeAdapter()) {}

  public getMatches(inProgress: InProgress): Promise<IMatch[]> {
    return this.match.findAll(inProgress);
  }

  public createMatch(newMatch: Omit<IMatch, 'id' | 'inProgress'>): Promise<IMatch> {
    return this.match.create(newMatch);
  }

  public async updateMatchProgress(id: number): Promise<number | Error> {
    const [affectedRows] = await this.match.update(id);
    if (!affectedRows) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'Match not updated. Provide a valid id or match is already finished',
      );
    }
    return affectedRows;
  }
}
