import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import InProgress from '../../utils/interfaces/match/match.inProgress.type';
import { IController } from '../../utils/interfaces';
import IMatchService from '../../utils/interfaces/match/match.service.interface';
import MatchService from './match.service';

export default class MatchController implements IController {
  public path = '/matches';
  public router = Router();

  constructor(private matchService: IMatchService = new MatchService()) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getMatchesHandler);
  }

  private getMatchesHandler = async (
    req: Request<unknown, unknown, unknown, { inProgress: InProgress }>,
    res: Response,
  ): Promise<Response | void> => {
    const { inProgress } = req.query;
    const matches = await this.matchService.getMatches(inProgress);
    res.status(StatusCodes.OK).json(matches);
  };
}
