import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../app';
import authToken from './users.test';

chai.use(chaiHttp);

describe('rides test', () => {
  it('it should throw error no token provided', (done) => {
    request(server)
      .post('/api/v1/users/rides')
      .set('authorization', '')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.contain('No token provided');
        done();
      });
  });
  it('Failed to authenicate token! Valid token required', (done) => {
    request(server)
      .post('/api/v1/users/rides')
      .set('authorization', 'sdsjdksj')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.message).to.contain('Failed to authenicate token! Valid token required');
        done();
      });
  });
  describe('sign-up route test', () => {
    it('should return error if destination field is empty', (done) => {
      const emptyDestination = {
        destination: '',
        pickUpLocation: 'Lekki',
        departureTime: '16:40',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', authToken.token)
        .send(emptyDestination)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('destination field is required');
        });
      done();
    });
    it('should return error if destination does not contain alphabet', (done) => {
      const emptyDestination1 = {
        destination: '----',
        pickUpLocation: 'Lekki',
        departureTime: '16:40',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .send(emptyDestination1)
        .set('authorization', authToken.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('destination must contain at least one alphabet');
        });
      done();
    });
    it('should return error if destination contains special characters', (done) => {
      const emptyDestination1 = {
        destination: 'aaa&&&',
        pickUpLocation: 'Lekki',
        departureTime: '16:40',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('Content-Type', 'application/json')
        .set('authorization', authToken.token)
        .send(emptyDestination1)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain(
            'destination must be alphabetic, the use of spaces and "-" are allowed',
          );
        });
      done();
    });
    it('should return error if pickUpLocation field is empty', (done) => {
      const emptypickUpLocation = {
        destination: 'Lekki',
        pickUpLocation: '',
        departureTime: '16:40',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', authToken.token)
        .send(emptypickUpLocation)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('pickUpLocation field is required');
        });
      done();
    });
    it('should return error if pickUpLocation does not contain alphabet', (done) => {
      const emptypickUpLocation1 = {
        destination: 'Lekki',
        pickUpLocation: '----',
        departureTime: '16:40',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .send(emptypickUpLocation1)
        .set('authorization', authToken.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('pickUpLocation must contain at least one alphabet');
        });
      done();
    });
    it('should return error if pickUpLocation contains special characters', (done) => {
      const emptypickUpLocation2 = {
        destination: 'Lekki',
        pickUpLocation: 'aaa&&&',
        departureTime: '16:40',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('Content-Type', 'application/json')
        .set('authorization', authToken.token)
        .send(emptypickUpLocation2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain(
            'pickUpLocation must be alphabetic, the use of spaces and "-" are allowed',
          );
        });
      done();
    });
    it('should return error if departureTime field is empty', (done) => {
      const emptydepartureTime = {
        destination: 'Lekki',
        pickUpLocation: 'Gbagada',
        departureTime: '',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', authToken.token)
        .send(emptydepartureTime)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('departureTime field is required');
        });
      done();
    });
    it('should return error if departureTime format is wrong', (done) => {
      const emptydepartureTime2 = {
        destination: 'Lekki',
        pickUpLocation: 'Gbagada',
        departureTime: '20',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', authToken.token)
        .send(emptydepartureTime2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain(
            'Invalid time format.. enter required format - hh:mm e.g:- 16:40',
          );
        });
      done();
    });
    it('should return error if departureDate field is empty', (done) => {
      const emptydepartureDate = {
        destination: 'Lekki',
        pickUpLocation: 'Gbagada',
        departureTime: '15:49',
        departureDate: '',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', authToken.token)
        .send(emptydepartureDate)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('departureDate field is required');
        });
      done();
    });
    it('should return error if departureDate format is wrong', (done) => {
      const emptydepartureDate2 = {
        destination: 'Lekki',
        pickUpLocation: 'Gbagada',
        departureTime: '15:49',
        departureDate: '90',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', authToken.token)
        .send(emptydepartureDate2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain(
            'Invalid Date format.. enter required format - dd/mm/yyyy e.g:- 10/05/2018',
          );
        });
      done();
    });
    it('should create ride successful', (done) => {
      const newRide = {
        destination: 'Lekki',
        pickUpLocation: 'Gbagada',
        departureTime: '15:49',
        departureDate: '11/12/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', authToken.token)
        .send(newRide)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.contain('Ride created successfully');
        });
      done();
    });
    it('should return bad request', (done) => {
      const newRide = {
        userId: 50,
        destination: 'Lekki',
        pickUpLocation: 'Gbagada',
        departureTime: '15:49',
        departureDate: '11/12/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', authToken.token)
        .send(newRide)
        .end((err, res) => {
          expect(res.status).to.equal(500);
        });
      done();
    });
    it('should return a 400 status code if rider id invalid', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides/0/requests')
        .set('authorization', authToken.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
            expect(res.body.message).to.contain('Invalid request id!!');
        });
      done();
    });

      it('should return a 400 status code if request id invalid', (done) => {
          chai
              .request(server)
              .put('/api/v1/users/rides/1/requests/0')
              .set('authorization', authToken.token)
              .end((err, res) => {
                  expect(res.status).to.equal(400);
                  expect(res.body.message).to.contain('Invalid request id!!');
              });
          done();
      });

      it('should return all rides', (done) => {
          chai
              .request(server)
              .get('/api/v1/rides')
              .set('authorization', authToken.token)
              .end((err, res) => {
                  expect(res.status).to.equal(200);
              });
          done();
      });

  });
});
