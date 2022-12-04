import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IController } from '../../utils/interfaces';
import LeaderBoardService from './leaderboard.service';
import { TeamType, ILeaderBoardService } from '../../utils/interfaces/leaderboard';

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
    this.router.get(this.path, this.getLeaderBoardHandler);
  }

  private getLeaderBoardHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    const teamType = req.url.split('/')[2] as TeamType;
    const homeLeaderBoard = await this.leaderBoardService.getLeaderBoard(teamType);
    res.status(StatusCodes.OK).json(homeLeaderBoard);
  };
}
