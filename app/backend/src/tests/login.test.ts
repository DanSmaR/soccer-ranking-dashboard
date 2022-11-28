import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import UserController from '../resources/user/user.controller';
import App from '../app';
import UserModel from '../database/models/UserModel';
import user, { userWithPasswordOmitted, userWithInvalidPassword } from './mocks/user';

chai.use(chaiHttp);

const { app } = new App([new UserController()]);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testing the "/login" POST route', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(user as UserModel);
  });

  afterEach(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('should return a token and status OK when valid email and password is sent', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: "admin@admin.com",
        password: "secret_admin"
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.token).to.exist;
    expect(!!jwt.verify(chaiHttpResponse.body.token, process.env.JWT_SECRET as jwt.Secret)).to.equal(true);
  });

  it('should return bad request status if an email is not provided', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '',
        password: "secret_admin"
      });
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled");
  });

  it('should return bad request status if a password is not provided', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: ''
      });
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled");
  });
});

describe('Testing the "/login" POST route, but with no user returned from database', () => {
  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(null);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('should return unauthorized status if an incorrect email is provided', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@xablau.com',
        password: 'secret_admin'
      });
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.equal("Incorrect email or password");
  });
});

describe('Testing the "/login" POST route, sending an incorrect password', () => {
  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(userWithInvalidPassword as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('should return unauthorized status if an incorrect password is provided', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'senha_invalida'
      });
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.equal("Incorrect email or password");
  });
});

describe('Testing the "/login/validate" GET route, sending a correct token', () => {
  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(user as UserModel);

    sinon
      .stub(UserModel, 'findByPk')
      .resolves(userWithPasswordOmitted as UserModel)
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
    (UserModel.findByPk as sinon.SinonStub).restore();
  });

  it('should return the role of the user and OK http-status', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
    
    const { token } = chaiHttpResponse.body as Record<string, string>;

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', token);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.role).to.be.equal('admin');
  });
});

describe('Testing the "/login/validate" GET route, sending no token', () => {
  it('should return unauthorized status and "Invalid Token" message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate');
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Invalid Token');
  });
});

describe('Testing the "/login/validate" GET route, sending incorrect token', () => {
  it('should return unauthorized status and "Invalid Token" message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'invalid_token');
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Invalid Token');
  });
});
