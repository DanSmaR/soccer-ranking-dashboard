import { ILeaderBoardModel, ILeaderBoardService,
  TeamType } from '../../utils/interfaces/leaderboard';
import ILeaderBoard from './leaderboard.interface';
import LeaderBoardSequelizeAdapter from './leaderboard.sequelize.model';

export default class LeaderBoardService implements ILeaderBoardService {
  constructor(private leaderBoard: ILeaderBoardModel = new LeaderBoardSequelizeAdapter()) {}

  public getLeaderBoard(teamType: TeamType): Promise<ILeaderBoard[]> {
    return this.leaderBoard.querySelect(teamType);
  }
}
