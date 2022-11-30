import ILeaderBoard from '../../../resources/leaderboard/leaderboard.interface';
import TeamType from './match.teamType.type';

export default interface ILeaderBoardService {
  getLeaderBoard(teamType: TeamType): Promise<ILeaderBoard[]>;
}
