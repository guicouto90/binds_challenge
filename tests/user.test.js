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

describe('POST /users', () => {

  describe('User successfully registered', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'teste@teste.com',
          password: '123456'
        })
    })

    it('Return status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "User with email teste@teste.com registered succesfully"', () => {
      expect(response.body.message).to.be.equals("User with email teste@teste.com registered succesfully");
    });
  })

  describe('There is no "email" field', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          password: '123456'
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"email\" is required"', () => {
      expect(response.body.message).to.be.equals("\"email\" is required");
    });
  })

  describe('There is no "password" field', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste@teste.com"
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"password\" is required"', () => {
      expect(response.body.message).to.be.equals("\"password\" is required");
    });
  })

  describe('Email field is not a String with email format', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste",
          password: "1234656"
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"email\" must be a valid email"', () => {
      expect(response.body.message).to.be.equals("\"email\" must be a valid email");
    });
  })

  describe('Password field doesnt have at least 6 characters', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste@teste.com",
          password: "1234"
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"password\" length must be at least 6 characters long"', () => {
      expect(response.body.message).to.be.equals("\"password\" length must be at least 6 characters long");
    });
  })
})

describe('PUT /users', () => {

  describe('Password updated successfully', () => {
    let response;
    before(async () => {
      Users.create({
        email: 'teste@teste.com',
        password: '123456'
      })
      const token = generateToken('teste@teste.com')
      response = await chai.request(server)
        .put('/users')
        .set('authorization', token)
        .send({
          password: '123456',
          newPassword: '1234567'
        })
    })

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "Password updated successfully"', () => {
      expect(response.body.message).to.be.equals("Password updated successfully");
    });
  })

  describe('When the password is invalid', () => {
    let response;
    before(async () => {
      Users.create({
        email: 'teste@teste.com',
        password: '123456'
      })
      const token = generateToken('teste@teste.com')
      response = await chai.request(server)
        .put('/users')
        .set('authorization', token)
        .send({
          password: '12345678',
          newPassword: '12345676'
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

    it('Property "message" have the value: "Invalid password"', () => {
      expect(response.body.message).to.be.equals("Invalid password");
    });
  })

  describe('When there is no token', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .put('/users')
        .send({
          password: '123456',
          newPassword: '1234568'
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "jwt must be provided"', () => {
      expect(response.body.message).to.be.equals("jwt must be provided");
    });
  })
  
  describe('When is not a valid token', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .put('/users')
        .set('authorization', "123456")
        .send({
          password: '123456',
          newPassword: '1234568'
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "jwt malformed"', () => {
      expect(response.body.message).to.be.equals("jwt malformed");
    });
  })
})

describe('PUT /users', () => {

  describe('User deleted successfully', () => {
    let response;
    before(async () => {
      Users.create({
        email: 'teste@teste.com',
        password: '123456'
      })
      const token = generateToken('teste@teste.com')
      response = await chai.request(server)
        .delete('/users')
        .set('authorization', token)
    })

    it('Return status 204', () => {
      expect(response).to.have.status(204);
    });
  })

  describe('When the user is not found', () => {
    let response;
    before(async () => {
      const token = generateToken('teste@teste.com.br')
      response = await chai.request(server)
        .delete('/users')
        .set('authorization', token)
    })

    it('Return status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "User not found"', () => {
      expect(response.body.message).to.be.equals("User not found");
    });
  })

  describe('When there is no token', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .delete('/users')
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "jwt must be provided"', () => {
      expect(response.body.message).to.be.equals("jwt must be provided");
    });
  })
  
  describe('When is not a valid token', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .delete('/users')
        .set('authorization', "123456")
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "jwt malformed"', () => {
      expect(response.body.message).to.be.equals("jwt malformed");
    });
  })
})
