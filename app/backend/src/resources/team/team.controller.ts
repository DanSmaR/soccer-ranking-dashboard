import { Router, Request, Response, NextFunction } from 'express';
import { IController } from '../../utils/interfaces';
import TeamService from './team.service';
import ITeamService from '../../utils/interfaces/team/team.service.interface';

export default class TeamController implements IController {
  private _path = '/teams';
  private _router = Router();

  constructor(private teamService: ITeamService = new TeamService()) {
    this.initializeRoutes();
  }

  get path() {
    return this._path;
  }

  get router() {
    return this._router;
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getTeamsHandler);
    this.router.get(`${this.path}/:id`, this.getSingleTeamHandler);
  }

  private getTeamsHandler = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response | void> => {
    const teams = await this.teamService.getTeams();
    res.status(200).json(teams);
  };

  private getSingleTeamHandler = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<Response | void> => {
    const team = await this.teamService.getSingleTeam(Number(req.params.id));
    res.status(200).json(team);
  };
}
