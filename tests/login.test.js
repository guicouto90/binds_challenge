const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/server');
const { generateToken } = require('../middlewares/auth');
const Users = require('../models/Users');
const { connect, clearDatabase, closeDatabase } = require('./connectionMock');

chai.use(chaiHttp);
const { expect } = chai;

before(async () => await connect());

afterEach(async () => await clearDatabase());

after(async () => closeDatabase());

describe('POST /login', () => {

  describe('User successfully registered', () => {
    let response;
    let token;
    before(async () => {
      Users.create({
        email: 'teste@teste.com.ca',
        password: '123456'
      })
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'teste@teste.com.ca',
          password: '123456'
        })
      token = generateToken('teste@teste.com.ca');
    })

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "token" in the body', () => {
      console.log(response.body)
      expect(response.body).to.have.property('token');
    });

    it('Property "token" have the value of a valid token', () => {
      expect(response.body.token).to.be.equals(token);
    });
  })

  describe('Password or email are invalid', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: "teste@teste.com.ca",
          password: '12345698'
        })
    })

    it('Return status 401', () => {
      expect(response).to.have.status(401);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "Invalid email or password"', () => {
      expect(response.body.message).to.be.equals("Invalid email or password");
    });
  })
})