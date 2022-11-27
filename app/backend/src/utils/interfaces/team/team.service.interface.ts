import ITeam from '../../../resources/team/team.interface';

export default interface ITeamService {
  getTeams(): Promise<ITeam[]>;
  getSingleTeam(id: number): Promise<ITeam | Error>;
}
