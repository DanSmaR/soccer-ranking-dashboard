import Team from '../../database/models/TeamModel';

export default interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: Omit<Team, 'id'>;
  teamAway: Omit<Team, 'id'>;
}
