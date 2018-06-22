import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

describe('string test', () => {
  it('should return string', (done) => {
  chai.request(server)
    .get('/')
    .end((req, res) => {
      expect(res.status).to.equal(200);
      done();
   })
  })
})
