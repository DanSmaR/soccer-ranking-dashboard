import { Op } from 'sequelize';
import IMatch, { ITeamMatch } from './match.interface';
import IMatchModel from '../../utils/interfaces/match/match.model.interface';
import MatchModel from '../../database/models/MatchModel';
import InProgress from '../../utils/interfaces/match/match.inProgress.type';
import Team from '../../database/models/TeamModel';

interface ITeamMatchSequelize {
  teamHome: Omit<Team, 'id'>;
  teamAway: Omit<Team, 'id'>;
}
export default class MatchSequelizeAdapter implements IMatchModel {
  private match = MatchModel;

  public async findAll(
    inProgress: InProgress = 'all',
  ): Promise<(ITeamMatch & IMatch)[]> {
    const option = {
      true: { inProgress: { [Op.eq]: true } },
      false: { inProgress: { [Op.eq]: false } },
      all: undefined,
    };

    const matches = await this.match.findAll({
      where: option[inProgress as Exclude<InProgress, undefined>],
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    }) as unknown as (ITeamMatchSequelize & MatchModel)[];

    return matches;
  }

  public create(newMatch: Omit<IMatch, 'id' | 'inProgress'>): Promise<IMatch> {
    return this.match.create(newMatch);
  }

  public update(id: number, data: Record<string, any>): Promise<[number]> {
    return this.match.update(data, { where: { id } });
  }
}
