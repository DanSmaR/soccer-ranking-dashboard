import { ILeaderBoardModel, ILeaderBoardService } from '../../utils/interfaces/leaderboard';
import ILeaderBoard from './leaderboard.interface';
import LeaderBoardSequelizeAdapter from './leaderboard.sequelize.model';
import homeLeaderBoardSQLQuery from './leaderboard.sqlRawQueries';

export default class LeaderBoardService implements ILeaderBoardService {
  constructor(private leaderBoard: ILeaderBoardModel = new LeaderBoardSequelizeAdapter()) {}

  public getHomeLeaderBoard(): Promise<ILeaderBoard[]> {
    return this.leaderBoard.querySelect(homeLeaderBoardSQLQuery);
  }
}
