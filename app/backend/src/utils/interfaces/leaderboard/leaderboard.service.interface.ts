import ILeaderBoard from '../../../resources/leaderboard/leaderboard.interface';

export default interface ILeaderBoardService {
  getHomeLeaderBoard(): Promise<ILeaderBoard[]>;
}
