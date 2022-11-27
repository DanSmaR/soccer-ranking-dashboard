import ITeamService from '../../utils/interfaces/team/team.service.interface';
import ITeamModel from '../../utils/interfaces/team/team.model.interface';
import TeamSequelizeAdapter from './team.sequelize.model';
import ITeam from './team.interface';

export default class TeamService implements ITeamService {
  constructor(private team: ITeamModel = new TeamSequelizeAdapter()) {}

  public async getTeams(): Promise<ITeam[] | Error> {
    const teams = this.team.findAll();
    return teams;
  }
}
