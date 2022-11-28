import Team from "../../database/models/TeamModel";

const allMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Internacional"
    }
  }
];

export const createdMatch = {
  id: 49,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

export const matchToCreate = {
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
}

export const sameTeamsMatchToCreate = {
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 16,
  awayTeamGoals: 2,
}

export default allMatches;
