import ITeam from './team.interface';
import ITeamModel from '../../utils/interfaces/team/team.model.interface';
import TeamModel from '../../database/models/TeamModel';

export default class TeamSequelizeAdapter implements ITeamModel {
  private team = TeamModel;

  public findAll(): Promise<ITeam[]> {
    return this.team.findAll();
  }

  public findById(id: number): Promise<ITeam | null> {
    return this.team.findByPk(id);
  }
}
