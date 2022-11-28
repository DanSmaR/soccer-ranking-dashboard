import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import InProgress from '../../utils/interfaces/match/match.inProgress.type';
import { IController } from '../../utils/interfaces';
import IMatchService from '../../utils/interfaces/match/match.service.interface';
import MatchService from './match.service';
import IMatch from './match.interface';
import authenticateMiddleware from '../../middleware/authentication.middleware';
import UserSequelizeAdapter from '../user/user.sequelize.model';

export default class MatchController implements IController {
  private _path = '/matches';
  private _router = Router();

  constructor(private matchService: IMatchService = new MatchService()) {
    this.initializeRoutes();
  }

  get path() {
    return this._path;
  }

  get router() {
    return this._router;
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getMatchesHandler);
    this.router.post(
      this.path,
      authenticateMiddleware(new UserSequelizeAdapter()),
      this.createMatchHandler,
    );
  }

  private getMatchesHandler = async (
    req: Request<unknown, unknown, unknown, { inProgress: InProgress }>,
    res: Response,
  ): Promise<Response | void> => {
    const { inProgress } = req.query;
    const matches = await this.matchService.getMatches(inProgress);
    res.status(StatusCodes.OK).json(matches);
  };

  private createMatchHandler = async (
    req: Request<unknown, unknown, Omit<IMatch, 'id' | 'inProgress'>>,
    res: Response,
  ): Promise<Response | void> => {
    const match = await this.matchService.createMatch(req.body);
    res.status(StatusCodes.CREATED).json(match);
  };
}
