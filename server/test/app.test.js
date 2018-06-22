import chai from 'chai';
import { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../app';
//
// // chai.use(chaiHttp);

describe('string test', () => {
  it('should return string', () => {
    expect('Server Working').to.equal('Server Working');
  });
});
