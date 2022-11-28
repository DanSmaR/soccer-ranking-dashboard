// import { Op } from 'sequelize';
import App from './app';
import 'dotenv/config';
import UserController from './resources/user/user.controller';
import TeamController from './resources/team/team.controller';
import MatchController from './resources/match/match.controller';
// import MatchModel from './database/models/MatchModel';
// import Team from './database/models/TeamModel';

const PORT = process.env.APP_PORT || 3001;

new App([new UserController(), new TeamController(), new MatchController()]).start(PORT);

// test Models
// eslint-disable-next-line max-lines-per-function
// async function getMatches(inProgress = 'all') {
//   interface IOption {
//     true: string;
//     false: string;
//     all: string;
//   }
//   const option = {
//     true: {
//       inProgress: {
//         [Op.eq]: true,
//       },
//     },
//     false: {
//       inProgress: {
//         [Op.eq]: false,
//       },
//     },
//     all: undefined,
//   };
//   const matches = await MatchModel.findAll({
//     where: option[inProgress as keyof IOption],
//     include: [
//       {
//         model: Team,
//         as: 'teamHome',
//         attributes: { exclude: ['id'] },
//       },
//       { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
//     ],
//   });
//   console.log(matches.filter(({ inProgress: progress }) => progress === true)
//     .map((match) => match.dataValues));
//   console.log(matches[0].dataValues);
// }

// getMatches();
