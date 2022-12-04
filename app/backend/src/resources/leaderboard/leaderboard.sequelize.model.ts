import { QueryTypes } from 'sequelize';
import sequelize from '../../database/models';
import ILeaderBoard from './leaderboard.interface';
import { ILeaderBoardModel, TeamType } from '../../utils/interfaces/leaderboard';
import leaderBoardSQLQuery from './leaderboard.sqlRawQueries';

export default class LeaderBoardSequelizeAdapter implements ILeaderBoardModel {
  private leaderboard = sequelize;

  public querySelect(query: TeamType = 'all'): Promise<ILeaderBoard[]> {
    return this.leaderboard.query(
      leaderBoardSQLQuery[query as Exclude<TeamType, undefined>],
      { type: QueryTypes.SELECT },
    );
  }
}
