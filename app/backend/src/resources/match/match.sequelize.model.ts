import { Op } from 'sequelize';
import IMatch from './match.interface';
import IMatchModel from '../../utils/interfaces/match/match.model.interface';
import MatchModel from '../../database/models/MatchModel';
import InProgress from '../../utils/interfaces/match/match.inProgress.type';

export default class MatchSequelizeAdapter implements IMatchModel {
  private match = MatchModel;

  public async findAll(inProgress: InProgress = 'all'): Promise<IMatch[]> {
    type Option = {
      true: string;
      false: string;
      all: string;
    };

    const option = {
      true: { inProgress: { [Op.eq]: true } },
      false: { inProgress: { [Op.eq]: false } },
      all: {},
    };

    const matches = await this.match.findAll({
      where: option[inProgress as keyof Option],
      include: [
        { model: MatchModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: MatchModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    }) as IMatch[];

    return matches;
  }
}
