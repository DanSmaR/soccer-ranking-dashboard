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
import TeamNames from '../utils/interfaces/match/match.teamNames.type'
import allMatches, { createdMatch, matchToCreate } from './mocks/allMatches';
import user, { userWithPasswordOmitted } from './mocks/user';

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

describe('Testing the "/matches POST route', () => {
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
      (MatchModel.create as sinon.SinonStub).restore();
      (MatchModel.update as sinon.SinonStub).restore();
    });
  
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
    });

    describe('Testing the "/matches/:id/finish" PATCH route', () => {
      it('should return a message with content "Finished" when sending a valid "id" match and the match been in progress yet', async() => {
        const token = await login();

        sinon
          .stub(MatchModel, 'update')
          .resolves([1]);

        chaiHttpResponse = await chai
          .request(app)
          .patch('matches/41/finish')
          .set('Authorization', token);

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body.message).to.be.equal('Finished');
      });
    });
  });
});
