import 'dotenv/config';
import App from './app';
import UserController from './resources/user/user.controller';
import TeamController from './resources/team/team.controller';
import MatchController from './resources/match/match.controller';
import LeaderBoardController from './resources/leaderboard/leaderboard.controller';
import { IController } from './utils/interfaces';

const PORT = process.env.APP_PORT || 3001;

const controllers: IController[] = [
  new UserController(),
  new TeamController(),
  new MatchController(),
  new LeaderBoardController(),
];

new App(controllers).start(PORT);
