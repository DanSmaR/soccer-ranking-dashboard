import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import ILeaderBoardService from '../../utils/interfaces/leaderboard/leaderboard.service.interface';
import { IController } from '../../utils/interfaces';
import LeaderBoardService from './leaderboard.service';

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
    this.router.get(`${this.path}/home`, this.getHomeLeaderBoardHandler);
  }

  private getHomeLeaderBoardHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    const homeLeaderBoard = await this.leaderBoardService.getHomeLeaderBoard();
    res.status(StatusCodes.OK).json(homeLeaderBoard);
  };
}
