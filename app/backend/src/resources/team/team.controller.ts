import { Router, Request, Response, NextFunction, } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import HttpException from '../../utils/exceptions/http.exception';
import { IController } from '../../utils/interfaces';
import TeamService from './team.service';
// import ITeam from './team.interface';
import ITeamService from '../../utils/interfaces/team/team.service.interface';

export default class TeamController implements IController {
  public path = '/teams';
  public router = Router();

  constructor(private teamService: ITeamService = new TeamService()) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getTeams);
  }

  private getTeams = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response | void> => {
    const teams = await this.teamService.getTeams();
    res.status(200).json(teams);
  };
}
