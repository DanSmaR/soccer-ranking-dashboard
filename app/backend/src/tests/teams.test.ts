import * as sinon from 'sinon';
import * as chai from 'chai';
import 'dotenv/config';
// @ts-ignore

import chaiHttp = require('chai-http');
import TeamController from '../resources/team/team.controller';
import App from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import teamsList from './mocks/teams';

chai.use(chaiHttp);

const { app } = new App([new TeamController()]);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testing the "/teams" GET route', () => {
  beforeEach(async () => {
    sinon
      .stub(TeamModel, 'findAll')
      .resolves(teamsList as TeamModel[])
  });

  afterEach(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  it('should return a list with all teams in database', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsList);
  });
});

describe('Testing the "/teams/:id" GET route', () => {
  beforeEach(async () => {
    sinon
      .stub(TeamModel, 'findByPk')
      .resolves(teamsList[0] as TeamModel)
  });

  afterEach(() => {
    (TeamModel.findByPk as sinon.SinonStub).restore();
  });

  it('should return a single team from database based on the id param', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsList[0]);
  });
});