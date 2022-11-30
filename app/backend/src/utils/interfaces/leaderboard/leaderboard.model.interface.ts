import ILeaderBoard from '../../../resources/leaderboard/leaderboard.interface';

export default interface ILeaderBoardModel {
  querySelect(query: string): Promise<ILeaderBoard[]>
}
