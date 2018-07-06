import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

describe('API endpoints test', () => {
  describe('default route test /', () => {
    it('should return welcome message', (done) => {
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
    it('should return welcome message', (done) => {
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

  describe('GET all rides api/v1/rides', () => {
    it('should get all ride offers', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).not.equal(undefined);
        });
      done();
    });
  });

  describe('GET one ride offer', () => {
    it('should get a single ride offer', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides/0')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res).to.be.an('Object');
          expect(res.body.message).to.contain(
            'Ride with id - 0 not found, Please enter a valid ride Id',
          );
        });
      done();
    });
  });

  describe('GET one ride offer', () => {
    it('should get a single ride offer', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Sucess! Ride found');
        });
      done();
    });
  });
  describe('CREATE new ride offer', () => {
    it('should create new ride offer', (done) => {
      const newRide = {
        driver: 'John Smith',
        destination: 'Ikeja',
        pickUpLocation: 'Surulere',
        departureTime: '9:00AM',
        departureDate: '30/6/2018',
      };
      chai
        .request(server)
        .post('/api/v1/rides')
        .send(newRide)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.contain('New ride created successfully');
        });
      done();
    });

    it('should return a status code 400 if a required field is missing when creating ride', (done) => {
      const newRide = {
        destination: 'Ikeja',
        pickUpLocation: 'Surulere',
        departureTime: '9:00AM',
      };
      chai
        .request(server)
        .post('/api/v1/rides')
        .send(newRide)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.contain(
            'Error!! check required fields, check api documentation for required fields',
          );
        });
      done();
    });
  });

  describe('POST make request to join ride', () => {
    it('should return a ride offer with status code 201', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides/2/requests')
        .send({ riderName: 'tomi' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.contain('Ride has been requested');
        });
      done();
    });
    it('should return a 400 status code if rider name is missing', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides/2/requests')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('riderName is required');
        });
      done();
    });
    it('should return a 404 status code if rider id invalid', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides/0/requests')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.contain(
            'Ride with id - 0 not found, check all rides for available rides',
          );
        });
      done();
    });
  });
});
