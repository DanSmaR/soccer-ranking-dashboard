import App from './app';
import 'dotenv/config';
import UserController from './resources/user/user.controller';

const PORT = process.env.APP_PORT || 3001;

new App([new UserController()]).start(PORT);
