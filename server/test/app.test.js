import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

describe('API endpoints test', () => {
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

  // describe('GET one ride offer', () => {
  //   it('should get a single ride offer', (done) => {
  //     chai
  //       .request(server)
  //       .get('/api/v1/rides/0')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         expect(res).to.be.an('Object');
  //         // expect(res.body.message).to.contain('Ride with id not found');
  //         // console.log(res.body.message);
  //       });
  //     done();
  //   });
  // });

  // describe('GET one ride offer', () => {
  //   it('should get a single ride offer', (done) => {
  //     chai
  //       .request(server)
  //       .get('/api/v1/rides/1')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body).to.have.property('message');
  //         expect(res.body.message).to.equal('Sucess! Ride found');
  //       });
  //     done();
  //   });
  // });
});
