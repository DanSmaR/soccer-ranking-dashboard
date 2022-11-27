import ITeam from '../../../resources/team/team.interface';

export default interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>;
}
