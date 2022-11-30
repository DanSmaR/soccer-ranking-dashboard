import ILeaderBoard from '../../../resources/leaderboard/leaderboard.interface';
import TeamType from './match.teamType.type';

export default interface ILeaderBoardModel {
  querySelect(query: TeamType): Promise<ILeaderBoard[]>
}
