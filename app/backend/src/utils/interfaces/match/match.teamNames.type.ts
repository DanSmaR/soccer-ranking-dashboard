import Team from '../../../database/models/TeamModel';

export default interface TeamNames {
  teamHome: Omit<Team, 'id'>;
  teamAway: Omit<Team, 'id'>;
}
