import ILeaderBoard from '../../../resources/leaderboard/leaderboard.interface';
import TeamType from './leaderboard.match.teamType.type';

export default interface ILeaderBoardService {
  getLeaderBoard(teamType: TeamType): Promise<ILeaderBoard[]>;
}
