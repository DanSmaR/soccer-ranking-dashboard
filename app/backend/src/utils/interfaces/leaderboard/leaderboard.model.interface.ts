import ILeaderBoard from '../../../resources/leaderboard/leaderboard.interface';

export default interface ILeaderBoardModel {
  query(query: string): Promise<ILeaderBoard[]>
}
