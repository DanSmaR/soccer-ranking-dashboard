import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import MatchController from '../resources/match/match.controller';
import UserController from '../resources/user/user.controller';
import App from '../app';
import MatchModel from '../database/models/MatchModel';
import UserModel from '../database/models/UserModel';
import TeamModel from '../database/models/TeamModel';
import TeamNames from '../utils/interfaces/match/match.teamNames.type'
import allMatches, { createdMatch, matchToCreate, matchWithNonExistentTeams, sameTeamsMatchToCreate } from './mocks/allMatches';
import user, { userWithPasswordOmitted } from './mocks/user';
import teamsList from './mocks/teams';

chai.use(chaiHttp);

const { app } = new App([new UserController() ,new MatchController()]);

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
      .get('/matches?inProgress=true');
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
      .get('/matches?inProgress=false');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal([allMatches[0]]);
  });
});

describe('Testing the "/matches route', () => {
  describe('with the correct token in the request header', async () => {
    async function login() {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        });
          
      const { token } = chaiHttpResponse.body as Record<string, string>;
      return token;
    }

    beforeEach(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(user as UserModel);
      sinon
        .stub(UserModel, 'findByPk')
        .resolves(userWithPasswordOmitted as UserModel);
    });
  
    afterEach(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (UserModel.findByPk as sinon.SinonStub).restore();
    });
  
    describe('POST HTTP method "/matches" route', () => {
      it('should return a new created match with "inProgress" field set to "true" when sending the correct match data', async () => {
        const token = await login();
  
        sinon
          .stub(MatchModel, 'create')
          .resolves(createdMatch as MatchModel);
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', token)
          .send(matchToCreate);

        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.deep.equal(createdMatch);
  
        (MatchModel.create as sinon.SinonStub).restore();
      });

      it('should return a Error message: "It is not possible to create a match with two equal teams" when sending a new match with two equal teams', async () => {
        const token = await login();
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', token)
          .send(sameTeamsMatchToCreate);

        expect(chaiHttpResponse.status).to.be.equal(422);
        expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
      });

      it('should return a Error message: "There is no team with such id!" when sending a new match with at least one team not present in database', async () => {
        const token = await login();
        
        sinon
          .stub(TeamModel, 'findByPk')
          .onFirstCall()
          .resolves(null)
          .onSecondCall()
          .resolves(teamsList[1] as TeamModel);
        
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', token)
          .send(matchWithNonExistentTeams);

        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');

        (TeamModel.findByPk as sinon.SinonStub).restore();
      });
    });

    describe('Testing the "/matches/:id/finish" PATCH HTTP method route', () => {
      it('should return a message with content "Finished" when sending a valid "id" match and the match been in progress yet', async() => {
        const token = await login();
  
        sinon
          .stub(MatchModel, 'update')
          .resolves([1]);
  
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/41/finish')
          .set('Authorization', token);
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body.message).to.be.equal('Finished');
  
        (MatchModel.update as sinon.SinonStub).restore();
      });
    });

    describe('Testing the "/matches/:id/" PATCH HTTP method route', () => {
      it('should return a message: "Match score updated" when sending a object with the new teams score', async() => {
        const token = await login();
  
        sinon
          .stub(MatchModel, 'update')
          .resolves([1]);
  
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/41')
          .set('Authorization', token);
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body.message).to.be.equal('Match score updated');
  
        (MatchModel.update as sinon.SinonStub).restore();
      });
    });
  });

  describe('With an invalid token in the request header', () => {
    it('should return an Error message: "Token must be a valid token"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', 'invalid_token')
        .send(matchToCreate);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
    });
  });
});
