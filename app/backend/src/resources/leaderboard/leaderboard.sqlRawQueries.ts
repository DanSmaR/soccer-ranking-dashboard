const homeLeaderBoardSQLQuery = `select th.team_name as name,
  (sum(if(m.home_team_goals > m.away_team_goals, 1, 0)) * 3) + 
    (sum(if(m.home_team_goals = m.away_team_goals, 1, 0)) * 1) as totalPoints,
  count(m.id) as totalGames,
  sum(if(m.home_team_goals > m.away_team_goals, 1, 0)) as totalVictories,
  sum(if(m.home_team_goals = m.away_team_goals, 1, 0)) as totalDraws,
  sum(if(m.home_team_goals < m.away_team_goals, 1, 0)) as totalLosses,
  sum(m.home_team_goals) as goalsFavor, sum(m.away_team_goals) as goalsOwn,
  sum(m.home_team_goals) - sum(m.away_team_goals) as goalsBalance,
  round((((sum(if(m.home_team_goals > m.away_team_goals, 1, 0)) * 3) + 
    (sum(if(m.home_team_goals = m.away_team_goals, 1, 0)) * 1)) /
    (count(m.id) * 3)) * 100, 2) as efficiency
  from matches as m
  join teams as th
  on th.id = m.home_team
  where in_progress = false 
  group by home_team
  order by totalPoints desc,
    totalVictories desc,
    goalsBalance desc,
    goalsFavor desc,
    goalsOwn asc;`;

const awayLeaderBoard = `select ta.team_name as name,
  (sum(if(m.home_team_goals < m.away_team_goals, 1, 0)) * 3) + 
    (sum(if(m.home_team_goals = m.away_team_goals, 1, 0)) * 1) as totalPoints,
  count(m.id) as totalGames,
  sum(if(m.home_team_goals < m.away_team_goals, 1, 0)) as totalVictories,
  sum(if(m.home_team_goals = m.away_team_goals, 1, 0)) as totalDraws,
  sum(if(m.home_team_goals > m.away_team_goals, 1, 0)) as totalLosses,
  sum(m.away_team_goals) as goalsFavor,
  sum(m.home_team_goals) as goalsOwn,
  sum(m.away_team_goals) - sum(m.home_team_goals) as goalsBalance,
  round((((sum(if(m.home_team_goals < m.away_team_goals, 1, 0)) * 3) + 
    (sum(if(m.home_team_goals = m.away_team_goals, 1, 0)) * 1)) /
    (count(m.id) * 3)) * 100, 2) as efficiency
  from matches as m 
  join teams as ta
  on ta.id = m.away_team
  where in_progress = false 
  group by m.away_team
  order by totalPoints desc,
    totalVictories desc,
    goalsBalance desc,
    goalsFavor desc,
    goalsOwn asc;`;

const leaderBoardSQLQuery = {
  home: homeLeaderBoardSQLQuery,
  away: awayLeaderBoard,
  all: 'query',
};

export default leaderBoardSQLQuery;
