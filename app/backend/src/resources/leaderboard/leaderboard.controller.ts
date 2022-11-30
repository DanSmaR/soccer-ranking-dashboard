import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import ILeaderBoardService from '../../utils/interfaces/leaderboard/leaderboard.service.interface';
import { IController } from '../../utils/interfaces';
import LeaderBoardService from './leaderboard.service';
import TeamType from '../../utils/interfaces/leaderboard/match.teamType.type';

export default class LeaderBoardController implements IController {
  private _path = '/leaderboard';
  private _router = Router();

  constructor(private leaderBoardService: ILeaderBoardService = new LeaderBoardService()) {
    this.initializeRoutes();
  }

  get path() {
    return this._path;
  }

  get router() {
    return this._router;
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/home`, this.getLeaderBoardHandler);
    this.router.get(`${this.path}/away`, this.getLeaderBoardHandler);
  }

  private getLeaderBoardHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    const teamType = req.url.split('/')[2] as TeamType;
    console.log(teamType);
    const homeLeaderBoard = await this.leaderBoardService.getLeaderBoard(teamType);
    res.status(StatusCodes.OK).json(homeLeaderBoard);
  };
}
