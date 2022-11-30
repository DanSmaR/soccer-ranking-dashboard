import { QueryTypes } from 'sequelize';
import sequelize from '../../database/models';
import ILeaderBoard from './leaderboard.interface';
import { ILeaderBoardModel } from '../../utils/interfaces/leaderboard';

export default class LeaderBoardSequelizeAdapter implements ILeaderBoardModel {
  private leaderboard = sequelize;

  public querySelect(query: string): Promise<ILeaderBoard[]> {
    return this.leaderboard.query(query, { type: QueryTypes.SELECT });
  }
}
