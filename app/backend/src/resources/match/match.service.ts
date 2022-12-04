import { StatusCodes } from 'http-status-codes';
import { IMatchService, IMatchModel, InProgress } from '../../utils/interfaces/match';
import IMatch, { ITeamMatch } from './match.interface';
import MatchSequelizeAdapter from './match.sequelize.model';
import HttpException from '../../utils/exceptions/http.exception';

export default class MatchService implements IMatchService {
  constructor(private match: IMatchModel = new MatchSequelizeAdapter()) {}

  public getMatches(inProgress: InProgress): Promise<(IMatch & ITeamMatch)[]> {
    return this.match.findAll(inProgress);
  }

  public createMatch(newMatch: Omit<IMatch, 'id' | 'inProgress'>): Promise<IMatch | Error> {
    if (newMatch.awayTeam === newMatch.homeTeam) {
      throw new HttpException(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'It is not possible to create a match with two equal teams',
      );
    }
    return this.match.create(newMatch);
  }

  public async finishMatch(id: number): Promise<number | Error> {
    const [affectedRows] = await this.match.update(id, { inProgress: false });
    if (!affectedRows) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'Match not updated. Provide a valid id or match is already finished',
      );
    }
    return affectedRows;
  }

  public async updateMatchScore(
    id: number,
    score: Pick<IMatch, 'awayTeamGoals' | 'homeTeamGoals'>,
  ): Promise<number | Error> {
    const [affectedRows] = await this.match.update(id, score);
    if (!affectedRows) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        'Score not updated. Provide a valid id or score is already updated',
      );
    }
    return affectedRows;
  }
}
