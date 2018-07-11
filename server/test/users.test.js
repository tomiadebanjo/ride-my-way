import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import dotenv from 'dotenv';
import server from '../app';

dotenv.config();
const secret = process.env.SECRET;

let authToken;
let authToken2;

describe('default route test /', () => {
  it('should return welcome to ride my way', (done) => {
    request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.equal('Welcome to Ride My Way!');
        done();
      });
  });
});

describe('api v1 route /api/v1', () => {
  it('should return welcome to ride my way v1', (done) => {
    request(server)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.equal('Welcome to Ride My Way API v1');
        done();
      });
  });
});

describe('api wrong routes', () => {
  it('should catch all wrong routes', (done) => {
    request(server)
      .post('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('wrong endpoint: visit api with api/v1/signup');
        done();
      });
  });
});

describe('sign-up route test', () => {
  it('should return error if check required fields', (done) => {
    const emptyName = {
      fullName: '',
      email: '',
      password: '',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Check required fields');
        done();
      });
  });
  it('should return error if fullName field is empty', (done) => {
    const emptyFullName = {
      fullName: '',
      email: 'bukola@gmail.com',
      password: 'bukola',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyFullName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('fullName field is required');
        done();
      });
  });
  it('should return error if fullName does not contain alphabet', (done) => {
    const emptyFullName1 = {
      fullName: '----',
      email: 'bukola@gmail.com',
      password: 'bukola',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyFullName1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('fullName must contain at least one alphabet');
        done();
      });
  });
  it('should return error if fullName contains space', (done) => {
    const emptyFullName1 = {
      fullName: '    aaaa     ',
      email: 'bukola@gmail.com',
      password: 'bukola',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyFullName1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('fullName field is required');
        done();
      });
  });
  it('should return error if fullName contains special characters', (done) => {
    const emptyFullName2 = {
      fullName: 'aaa&&&',
      email: 'bukola@gmail.com',
      password: 'bukola',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyFullName2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain(
          'fullName must be alphabetic, the use of spaces and - are allowed',
        );
        done();
      });
  });
  it('should return error if password field is empty', (done) => {
    const emptyPassword = {
      fullName: 'fjkdhjk',
      email: 'bukola@gmail.com',
      password: '',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyPassword)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('password is required');
        done();
      });
  });
  it('should return error if password length is less than 6 characters', (done) => {
    const emptyPassword1 = {
      fullName: 'ndskdnsk',
      email: 'bukola@gmail.com',
      password: 'buko',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyPassword1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('Minimum password length is 6');
        done();
      });
  });
  it('should return error if password does not contain a minimum of 1 alphabet', (done) => {
    const emptyPassword2 = {
      fullName: 'aaasasa',
      email: 'bukola@gmail.com',
      password: '00++++',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyPassword2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('password must contain at least 1 alphabet');
        done();
      });
  });
  it('should return error if email field is empty', (done) => {
    const emptyEmail = {
      fullName: 'aaasasa',
      email: '',
      password: 'bukola',
    };
    request(server)
      .post('/api/v1/auth/signup')
      .send(emptyEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('Please enter a valid email address');
        done();
      });
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
        expect(res.body.message).to.contain('User registration successful');
        done();
      });
  });

  it('should throw Error: User already exists with that email address', (done) => {
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
        expect(res.status).to.equal(409);
        expect(res.body.message).to.contain('Error: User already exists with that email address');
        done();
      });
  });

  it('should return error if password field is empty (login route)', (done) => {
    const emptyPassword = {
      fullName: 'fjkdhjk',
      email: 'bukola@gmail.com',
      password: '',
    };
    request(server)
      .post('/api/v1/auth/login')
      .send(emptyPassword)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('password is required');
        done();
      });
  });
  it('should return error if password length is less than 6 characters (login route)', (done) => {
    const emptyPassword1 = {
      fullName: 'ndskdnsk',
      email: 'bukola@gmail.com',
      password: 'buko',
    };
    request(server)
      .post('/api/v1/auth/login')
      .send(emptyPassword1)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('Minimum password length is 6');
        done();
      });
  });
  it('should return error if password does not contain a minimum of 1 alphabet (login route)', (done) => {
    const emptyPassword2 = {
      fullName: 'aaasasa',
      email: 'bukola@gmail.com',
      password: '00++++',
    };
    request(server)
      .post('/api/v1/auth/login')
      .send(emptyPassword2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('password must contain at least 1 alphabet');
        done();
      });
  });
  it('should return error if email field is empty(login route)', (done) => {
    const emptyEmail = {
      fullName: 'aaasasa',
      email: '',
      password: 'bukola',
    };
    request(server)
      .post('/api/v1/auth/login')
      .send(emptyEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.contain('Please enter a valid email address');
        done();
      });
  });
  it('should throw Error Invalid credentials', (done) => {
    const userLogin = {
      email: 'suki@gmail.com',
      password: 'postgre',
    };
    request(server)
      .post('/api/v1/auth/login')
      .send(userLogin)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.contain('Invalid credentials');
        done();
      });
  });
  it('should throw Error User not found', (done) => {
    const userLogin1 = {
      email: 'su@gmail.com',
      password: 'postgre',
    };
    request(server)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(userLogin1)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        expect(res.body.success).to.equal(false);
        done();
      });
  });
  it('User login successful', (done) => {
    const userLogin1 = {
      email: 'suki@gmail.com',
      password: 'postgres',
    };
    request(server)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(userLogin1)
      .end((err, res) => {
        authToken = res.body.token;
        expect(res.status).to.equal(200);
        expect(res).to.be.an('Object');
        expect(res.body.message).to.eql('Welcome Suki boko, Login Successful');
        done();
      });
  });
  it('User login successful and return token', (done) => {
    const userLogin1 = {
      email: 'suki@gmail.com',
      password: 'postgres',
    };
    request(server)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(userLogin1)
      .end((err, res) => {
        expect(200);
        expect(res.body.token);
        expect(res.body.message).to.eql('Welcome Suki boko, Login Successful');
        done();
      });
  });
});

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
        expect(res.status).to.equal(401);
        expect(res.body.message).to.contain('Failed to authenicate token! Valid token required');
        done();
      });
  });

  describe('create ride test', () => {
    it('should return error if all fields are empty', (done) => {
      const emptyDestination = {
        destination: '',
        pickUpLocation: '',
        departureTime: '',
        departureDate: '',
      };
      request(server)
        .post('/api/v1/users/rides')
        .send(emptyDestination)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Check required fields');
          done();
        });
    });
    it('should return error if destination field is empty', (done) => {
      const emptyDestination = {
        destination: '',
        pickUpLocation: 'Lekki',
        departureTime: '16:40',
        departureDate: '11/02/2018',
      };
      request(server)
        .post('/api/v1/users/rides')
        .send(emptyDestination)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('destination field is required');
          done();
        });
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
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('destination must contain at least one alphabet');
          done();
        });
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
        .set('authorization', authToken)
        .send(emptyDestination1)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain(
            'destination must be alphabetic, the use of spaces and "-" are allowed',
          );
          done();
        });
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
        .set('authorization', authToken)
        .send(emptypickUpLocation)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('pickUpLocation field is required');
          done();
        });
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
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('pickUpLocation must contain at least one alphabet');
          done();
        });
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
        .set('authorization', authToken)
        .send(emptypickUpLocation2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain(
            'pickUpLocation must be alphabetic, the use of spaces and "-" are allowed',
          );
          done();
        });
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
        .set('authorization', authToken)
        .send(emptydepartureTime)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('departureTime field is required');
          done();
        });
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
        .set('authorization', authToken)
        .send(emptydepartureTime2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain(
            'Invalid time format.. enter required format - hh:mm e.g:- 16:40',
          );
          done();
        });
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
        .set('authorization', authToken)
        .send(emptydepartureDate)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain('departureDate field is required');
          done();
        });
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
        .set('authorization', authToken)
        .send(emptydepartureDate2)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.contain(
            'Invalid Date format.. enter required format - dd/mm/yyyy e.g:- 10/05/2018',
          );
          done();
        });
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
        .set('authorization', authToken)
        .send(newRide)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Ride created successfully');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
    it('should return bad request', (done) => {
      const newRide = {
        userId: 5000,
        destination: 'Lekki',
        pickUpLocation: 'Gbagada',
        departureTime: '15:49',
        departureDate: '11/12/2018',
      };
      const token = jwt.sign(
        {
          id: newRide.userId,
        },
        secret,
        { expiresIn: 7200 },
      );
      request(server)
        .post('/api/v1/users/rides')
        .set('authorization', token)
        .set('userId', 50)
        .send('userId = 50')
        .send(newRide)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          done();
        });
    });

    it('should return a single ride', (done) => {
      request(server)
        .get('/api/v1/rides/1')
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Ride Found');
          expect(res.body.rideDetails).to.be.an('object');
          done();
        });
    });

    it('should return a ride not found', (done) => {
      request(server)
        .get('/api/v1/rides/989899')
        .set('Content-Type', 'application/json')
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Ride not found!! Enter a valid ride ID');
          expect(res.body.message).to.be.a('string');
          done();
        });
    });

    it('should return all rides', (done) => {
      request(server)
        .get('/api/v1/rides')
        .set('Content-Type', 'application/json')
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('all available rides retrieved');
          expect(res.body.rides).to.be.an('array');
          done();
        });
    });

    it('should return a 400 status code if rider id invalid', (done) => {
      request(server)
        .post('/api/v1/rides/a/requests')
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Invalid ride id!!');
          done();
        });
    });

    it('should return a 400 status code if request id invalid', (done) => {
      request(server)
        .put('/api/v1/users/rides/1/requests/a')
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Invalid request id!!');
          done();
        });
    });

    describe('request ride test', () => {
      it('User login successful', (done) => {
        const userSignUp = {
          fullName: 'yusuf',
          email: 'yusuf1@gmail.com',
          password: 'yusuf1',
        };
        request(server)
          .post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send(userSignUp)
          .end((err, res) => {
            authToken2 = res.body.token;
            expect(res.status).to.equal(201);
            expect(res).to.be.an('object');
            expect(res.body.message).to.equal('User registration successful');
            done();
          });
      });
      it('should thorw error: you can not make a request to join a ride you created', (done) => {
        request(server)
          .post('/api/v1/rides/1/requests')
          .set('authorization', authToken)
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal(
              'you can not make a request to join a ride you created',
            );
            done();
          });
      });
      it('should create a ride request', (done) => {
        request(server)
          .post('/api/v1/rides/1/requests')
          .set('authorization', authToken2)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Ride has been requested');
            done();
          });
      });
      it('should throw error: you can request to join the same ride more than once', (done) => {
        request(server)
          .post('/api/v1/rides/1/requests')
          .set('authorization', authToken2)
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal('Error: You can only request for a ride once');
            done();
          });
      });
      it('should return ride with id not found when requesting ride', (done) => {
        request(server)
          .post('/api/v1/rides/2300/requests')
          .set('authorization', authToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Ride with that id not found');
            done();
          });
      });
      it('should return Error: No requests found for ride id', (done) => {
        request(server)
          .get('/api/v1/users/rides/2300/requests')
          .set('authorization', authToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('No requests found for ride id - 2300');
            done();
          });
      });

      it('should return Error: you can only get ride requests for rides you created', (done) => {
        request(server)
          .get('/api/v1/users/rides/1/requests')
          .set('authorization', authToken2)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal(
              'you can only get ride requests for rides you created',
            );
            done();
          });
      });

      it('should return ride requests', (done) => {
        request(server)
          .get('/api/v1/users/rides/1/requests')
          .set('authorization', authToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            done();
          });
      });

      it('should respond with a bad request to a ride request response', (done) => {
        const response = { response: 'accepted' };
        request(server)
          .put('/api/v1/users/rides/1909/requests/1')
          .set('authorization', authToken)
          .send(response)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Ride Request Not found!!');
            done();
          });
      });
      it('should send back a list of appropriate responses', (done) => {
        const response = { response: 'not accepted' };
        request(server)
          .put('/api/v1/users/rides/1/requests/1')
          .set('authorization', authToken)
          .send(response)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal(
              'Please enter one the required responses - [accepted, rejected, pending]',
            );
            done();
          });
      });
      it('should return riderequest status has been accepted', (done) => {
        const response = { response: 'accepted' };
        request(server)
          .put('/api/v1/users/rides/1/requests/1')
          .set('authorization', authToken)
          .send(response)
          .end((err, res) => {
            expect(res.status).to.equal(202);
            expect(res.body.message).to.equal('Ride request status updated, status - accepted');
            done();
          });
      });
      it('should throw error: You can only respond to requests of rides you created', (done) => {
        const response = { response: 'accepted' };
        request(server)
          .put('/api/v1/users/rides/1/requests/1')
          .set('authorization', authToken2)
          .send(response)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal(
              'You can only respond to requests of rides you created',
            );
            done();
          });
      });
    });
  });
});
