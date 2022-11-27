import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchController from '../resources/match/match.controller';
import App from '../app';
import MatchModel from '../database/models/MatchModel';
import allMatches, { TeamNames } from './mocks/allMatches';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App([new MatchController()]);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testing the "/matches" GET route', () => {
  beforeEach(async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .resolves(allMatches as (MatchModel & TeamNames)[])
  });

  afterEach(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('should return all matches from database', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
  });
});

describe('Testing the "/matches?inProgress=true" GET route', () => {
  beforeEach(async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .resolves([allMatches[1]] as (MatchModel & TeamNames)[])
  });

  afterEach(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('should return all matches which are in progress from database', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal([allMatches[1]]);
  });
});

describe('Testing the "/matches?inProgress=false" GET route', () => {
  beforeEach(async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .resolves([allMatches[0]] as (MatchModel & TeamNames)[])
  });

  afterEach(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('should return all matches which are finished from database', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal([allMatches[0]]);
  });
});
