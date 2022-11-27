import App from './app';
import 'dotenv/config';
import UserController from './resources/user/user.controller';
// import Team from './database/models/TeamModel';

const PORT = process.env.APP_PORT || 3001;

new App([new UserController()]).start(PORT);

// test Models
// async function getTeams() {
//   const teams = await Team.findAll();
//   console.log(teams);
// }

// getTeams();
