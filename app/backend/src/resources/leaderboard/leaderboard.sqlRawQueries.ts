const generalLeaderBoardColumnsSQLQuery = `
  SELECT name,
    SUM(totalPoints) AS totalPoints,
    SUM(totalGames) AS totalGames,
    SUM(totalVictories) AS totalVictories,
    SUM(totalDraws) AS totalDraws,
    SUM(totalLosses) AS totalLosses,
    SUM(goalsFavor) AS goalsFavor,
    SUM(goalsOwn) AS goalsOwn,
    SUM(goalsBalance) AS goalsBalance,
    ROUND((SUM(totalPoints) / (SUM(totalGames) * 3)) * 100, 2) AS efficiency
`;

const leaderBoardOrderBySQLQuery = `
  ORDER BY totalPoints DESC, totalVictories DESC,
    goalsBalance DESC, goalsFavor DESC,
    goalsOwn ASC
`;

function getPrimaryStatsByTeamTypeSQLQuery(teamType: 'away_team' | 'home_team') {
  const teamTypeAdversary = teamType === 'away_team' ? 'home_team' : 'away_team';
  return `
    SELECT t.team_name AS name, count(m.id) AS totalGames,
      SUM(IF(m.${teamType}_goals > m.${teamTypeAdversary}_goals, 1, 0)) AS totalVictories,
      SUM(IF(m.${teamType}_goals = m.${teamTypeAdversary}_goals, 1, 0)) AS totalDraws,
      SUM(IF(m.${teamType}_goals < m.${teamTypeAdversary}_goals, 1, 0)) AS totalLosses,
      SUM(m.${teamType}_goals) AS goalsFavor,
      SUM(m.${teamTypeAdversary}_goals) AS goalsOwn
    FROM matches AS m
    JOIN teams AS t
    ON t.id = m.${teamType}
    WHERE in_progress = false 
    GROUP BY name
  `;
}

function getAllStatsByTeamTypeSQLQuery(teamType: 'away_team' | 'home_team') {
  return `
    SELECT *,
      (totalVictories * 3) + totalDraws AS totalPoints,
      goalsFavor - goalsOwn AS goalsBalance
    FROM (
      ${getPrimaryStatsByTeamTypeSQLQuery(teamType)}
    ) AS t1
  `;
}

function getLeaderBoardByTeamTypeSQLQuery(teamType: 'away_team' | 'home_team') {
  return `
    SELECT name, totalPoints, totalGames, totalVictories,
      totalDraws, totalLosses, goalsFavor, goalsOwn, goalsBalance,
      ROUND((totalPoints / (totalGames * 3)) * 100, 2) AS efficiency
    FROM (
      ${getAllStatsByTeamTypeSQLQuery(teamType)}
    ) AS t2
    ${leaderBoardOrderBySQLQuery}
  `;
}

function getGeneralLeaderBoardSQLQuery() {
  return `
    ${generalLeaderBoardColumnsSQLQuery}  
    FROM (
      (${getLeaderBoardByTeamTypeSQLQuery('home_team')})
      UNION ALL
      (${getLeaderBoardByTeamTypeSQLQuery('away_team')})
    ) AS t
    GROUP BY name
    ${leaderBoardOrderBySQLQuery};
  `;
}

const leaderBoardSQLQuery = {
  home: getLeaderBoardByTeamTypeSQLQuery('home_team'),
  away: getLeaderBoardByTeamTypeSQLQuery('away_team'),
  all: getGeneralLeaderBoardSQLQuery(),
};

export default leaderBoardSQLQuery;
