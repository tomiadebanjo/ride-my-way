import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../app';

chai.use(chaiHttp);

const authToken = {};

describe('default route test /', () => {
  it('should return welcome to ride my way', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.equal('Welcome to Ride My Way!');
      });
    done();
  });
});

describe('api v1 route /api/v1', () => {
  it('should return welcome to ride my way v1', (done) => {
    chai
      .request(server)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.equal('Welcome to Ride My Way API v1');
      });
    done();
  });
});

describe('sign-up route test', () => {
  it('should return error if fullName field is empty', (done) => {
    const emptyFullName = {
      fullName: '',
      email: 'bukola@gmail.com',
      password: 'bukola',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(emptyFullName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('fullName is required');
      });
    done();
  });
  it('should return error if fullName does not contain alphabet', (done) => {
    const emptyFullName1 = {
      fullName: '----',
      email: 'bukola@gmail.com',
      password: 'bukola',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(emptyFullName1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('fullName must contain at least one alphabet');
      });
    done();
  });
  it('should return error if fullName contains special characters', (done) => {
    const emptyFullName2 = {
      fullName: 'aaa&&&',
      email: 'bukola@gmail.com',
      password: 'bukola',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(emptyFullName2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain(
          'fullName must be alphabetic, the use of spaces and - are allowed',
        );
      });
    done();
  });
  it('should return error if password field is empty', (done) => {
    const emptyPassword = {
      fullName: 'fjkdhjk',
      email: 'bukola@gmail.com',
      password: '',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(emptyPassword)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('password is required');
      });
    done();
  });
  it('should return error if password length is less than 6 characters', (done) => {
    const emptyPassword1 = {
      fullName: 'ndskdnsk',
      email: 'bukola@gmail.com',
      password: 'buko',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(emptyPassword1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('Minimum password length is 6');
      });
    done();
  });
  it('should return error if password does not contain a minimum of 1 alphabet', (done) => {
    const emptyPassword2 = {
      fullName: 'aaasasa',
      email: 'bukola@gmail.com',
      password: '00++++',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(emptyPassword2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('password must contain at least 1 alphabet');
      });
    done();
  });
  it('should return error if email field is empty', (done) => {
    const emptyEmail = {
      fullName: 'aaasasa',
      email: '',
      password: 'bukola',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(emptyEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('Please enter a valid email address');
      });
    done();
  });
  it('should create a new user with email and password', (done) => {
    const newUser = {
      fullName: 'Suki boko',
      email: 'suki@gmail.com',
      password: 'postgres',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.contain('User registration succesful');
        if (err) return done(err);
        done();
      });
  });

  it('should throw Error: User already exists with that email address', (done) => {
    const newUser = {
      fullName: 'Suki boko',
      email: 'suki1@gmail.com',
      password: 'postgres',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .end((err, res) => {
        console.log(err);
        expect(res.status).to.equal(409);
        expect(res.body.message).to.contain('Error: User already exists with that email address');
        if (err) return done(err);
        done();
      });
  });

  it('should return error if password field is empty (login route)', (done) => {
    const emptyPassword = {
      fullName: 'fjkdhjk',
      email: 'bukola@gmail.com',
      password: '',
    };
    chai
      .request(server)
      .post('/api/v1/auth/login')
      .send(emptyPassword)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('password is required');
      });
    done();
  });
  it('should return error if password length is less than 6 characters (login route)', (done) => {
    const emptyPassword1 = {
      fullName: 'ndskdnsk',
      email: 'bukola@gmail.com',
      password: 'buko',
    };
    chai
      .request(server)
      .post('/api/v1/auth/login')
      .send(emptyPassword1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('Minimum password length is 6');
      });
    done();
  });
  it('should return error if password does not contain a minimum of 1 alphabet (login route)', (done) => {
    const emptyPassword2 = {
      fullName: 'aaasasa',
      email: 'bukola@gmail.com',
      password: '00++++',
    };
    chai
      .request(server)
      .post('/api/v1/auth/login')
      .send(emptyPassword2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('password must contain at least 1 alphabet');
      });
    done();
  });
  it('should return error if email field is empty(login route)', (done) => {
    const emptyEmail = {
      fullName: 'aaasasa',
      email: '',
      password: 'bukola',
    };
    chai
      .request(server)
      .post('/api/v1/auth/login')
      .send(emptyEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('Please enter a valid email address');
      });
    done();
  });
  it('should throw Error Invalid password', (done) => {
    const userLogin = {
      fullName: 'Suki boko',
      email: 'suki1@gmail.com',
      password: 'postgre',
    };
    request(server)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(userLogin)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.contain('Invalid Password');
        if (err) return done(err);
        done();
      });
  });
  it('User login successful', (done) => {
    const userLogin1 = {
      fullName: 'Suki boko',
      email: 'suki1@gmail.com',
      password: 'postgres',
    };
    request(server)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(userLogin1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.contain(`Welcome ${userLogin1.fullName}, Login Successful`);
        if (err) return done(err);
        done();
      });
  });
  it('User login successful and return token', (done) => {
    const userLogin1 = {
      fullName: 'Suki boko',
      email: 'suki1@gmail.com',
      password: 'postgres',
    };
    request(server)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(userLogin1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        authToken.token = res.body.token;
        expect(res.body.token);
        expect(res.body.message).to.contain(`Welcome ${userLogin1.fullName}, Login Successful`);
        if (err) return done(err);
        done();
      });
  });
});
export default authToken;
