import { StatusCodes } from 'http-status-codes';
import ITeamService from '../../utils/interfaces/team/team.service.interface';
import ITeamModel from '../../utils/interfaces/team/team.model.interface';
import TeamSequelizeAdapter from './team.sequelize.model';
import ITeam from './team.interface';
import HttpException from '../../utils/exceptions/http.exception';

export default class TeamService implements ITeamService {
  constructor(private team: ITeamModel = new TeamSequelizeAdapter()) {}

  public async getTeams(): Promise<ITeam[]> {
    const teams = this.team.findAll();
    return teams;
  }

  public async getSingleTeam(id: number): Promise<ITeam | Error> {
    const team = await this.team.findById(id);
    if (!team) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Team not found');
    }
    return team;
  }
}
