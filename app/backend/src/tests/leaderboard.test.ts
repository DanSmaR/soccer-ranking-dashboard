import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import MatchController from '../resources/match/match.controller';
import LeaderBoardController from '../resources/leaderboard/leaderboard.controller';
import UserController from '../resources/user/user.controller';
import App from '../app';
import sequelize from '../database/models';
import MatchModel from '../database/models/MatchModel';
import UserModel from '../database/models/UserModel';
import TeamModel from '../database/models/TeamModel';
import TeamNames from '../utils/interfaces/match/match.teamNames.type'
import allMatches, { createdMatch, matchToCreate, matchWithNonExistentTeams, sameTeamsMatchToCreate } from './mocks/allMatches';
import user, { userWithPasswordOmitted } from './mocks/user';
import leaderBoard from './mocks/leaderboard';

chai.use(chaiHttp);

const { app } = new App([new UserController() ,new MatchController(), new LeaderBoardController()]);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testing the "/leaderboard" endpoint', () => {
  beforeEach(async () => {
    sinon
      .stub(sequelize, 'query')
      .resolves(leaderBoard as unknown as [unknown[], unknown]);
  });

  afterEach(() => {
    (sequelize.query as sinon.SinonStub).restore();
  });

  describe('Testing the "/leaderboard/home" GET HTTP endpoint', () => {
    it('should return the home teams classification based on database data and finished matches', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoard);
    });
  });
});