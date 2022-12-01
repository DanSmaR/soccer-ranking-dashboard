const homeLeaderBoardSQLQuery = `SELECT th.team_name AS name,
  (SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) * 3) + 
    (SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) * 1) AS totalPoints,
  count(m.id) AS totalGames,
  SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
  SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
  SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
  SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
  ROUND((((SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) * 3) + 
    (SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) * 1)) /
    (COUNT(m.id) * 3)) * 100, 2) AS efficiency
  FROM matches AS m
  JOIN teams AS th
  ON th.id = m.home_team
  WHERE in_progress = false 
  GROUP BY m.home_team
  ORDER BY totalPoints DESC,
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC,
    goalsOwn ASC;`;

const awayLeaderBoardSQLQuery = `SELECT ta.team_name AS name,
  (SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) * 3) + 
    (SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) * 1) AS totalPoints,
  COUNT(m.id) AS totalGames,
  SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalVictories,
  SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
  SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalLosses,
  SUM(m.away_team_goals) AS goalsFavor,
  SUM(m.home_team_goals) AS goalsOwn,
  SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
  round((((SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) * 3) + 
    (SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) * 1)) /
    (COUNT(m.id) * 3)) * 100, 2) AS efficiency
  FROM matches AS m 
  JOIN teams AS ta
  ON ta.id = m.away_team
  WHERE in_progress = false 
  GROUP BY m.away_team
  ORDER BY totalPoints DESC,
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC,
    goalsOwn ASC;`;

const generalLeaderBoardSQLQuery = `SELECT name,
  SUM(totalPoints) AS totalPoints,
  SUM(totalGames) AS totalGames,
  SUM(totalVictories) AS totalVictories,
  SUM(totalDraws) AS totalDraws,
  SUM(totalLosses) AS totalLosses,
  SUM(goalsFavor) AS goalsFavor,
  SUM(goalsOwn) AS goalsOwn,
  SUM(goalsBalance) AS goalsBalance,
  ROUND((SUM(totalPoints) / (SUM(totalGames) * 3)) * 100, 2) AS efficiency
  FROM (
  (SELECT th.team_name AS name,
  (SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) * 3) + 
    (SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) * 1) AS totalPoints,
  count(m.id) AS totalGames,
  SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
  SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
  SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
  SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
  ROUND((((SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) * 3) + 
    (SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) * 1)) /
    (COUNT(m.id) * 3)) * 100, 2) AS efficiency
  FROM matches AS m
  JOIN teams AS th
  ON th.id = m.home_team
  WHERE in_progress = false
  GROUP BY m.home_team)
  UNION ALL
  (SELECT ta.team_name AS name,
  (SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) * 3) + 
    (SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) * 1) AS totalPoints,
  COUNT(m.id) AS totalGames,
  SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalVictories,
  SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
  SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalLosses,
  SUM(m.away_team_goals) AS goalsFavor,
  SUM(m.home_team_goals) AS goalsOwn,
  SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
  round((((SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) * 3) + 
    (SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) * 1)) /
    (COUNT(m.id) * 3)) * 100, 2) AS efficiency
  FROM matches AS m 
  JOIN teams AS ta
  ON ta.id = m.away_team
  WHERE in_progress = false 
  GROUP BY m.away_team)) AS t
  GROUP BY name
  ORDER BY totalPoints DESC,
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC,
    goalsOwn ASC;`;

const leaderBoardSQLQuery = {
  home: homeLeaderBoardSQLQuery,
  away: awayLeaderBoardSQLQuery,
  all: generalLeaderBoardSQLQuery,
};

export default leaderBoardSQLQuery;
