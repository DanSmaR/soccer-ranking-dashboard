import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IController } from '../../utils/interfaces';
import IMatchService from '../../utils/interfaces/match/match.service.interface';

export default class MatchController implements IController {
  public path = '/matches';
  public router = Router();

  constructor(private matchService: IMatchService) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getMatchesHandler);
  }

  private getMatchesHandler = async (
    req: Request<{ inProgress: 'true' | 'false' | undefined }>,
    res: Response,
  ): Promise<Response | void> => {
    const { inProgress } = req.params;
    const matches = await this.matchService.getMatches(inProgress);
    res.status(StatusCodes.OK).json(matches);
  };
}
