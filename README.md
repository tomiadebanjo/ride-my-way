# ride-my-way

![Build Status](https://travis-ci.org/tomiadebanjo/ride-my-way.svg?branch=develop) [![Coverage Status](https://coveralls.io/repos/github/tomiadebanjo/ride-my-way/badge.svg?branch=fix-travis-integration-error-158839469)](https://coveralls.io/github/tomiadebanjo/ride-my-way?branch=fix-travis-integration-error-158839469) [![Maintainability](https://api.codeclimate.com/v1/badges/6a77aac0d9e850e8ffdd/maintainability)](https://codeclimate.com/github/tomiadebanjo/ride-my-way/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/6a77aac0d9e850e8ffdd/test_coverage)](https://codeclimate.com/github/tomiadebanjo/ride-my-way/test_coverage)

Ride-my-way is a carpooling application that provides drivers with the ability to create ride offers and passengers to join available ride offers

Required Features

- Users can create an account and log in.
- Drivers can add ride offers..
- Passengers can view all available ride offers.
- Passengers can see the details of a ride offer and request to join the ride. E.g What time the ride leaves, where it is headed e.t.c
- Drivers can view the requests to the ride offer they created.
- Drivers can either accept or reject a ride request.

# Features

- Users can only see and respond to ride offers from their friends on the application .
- Passengers get real time notifications when their request is accepted or rejected

# Technologies

- Nodejs
- Express
- Mocha, Chai, Babel, eslint

# Functionalities

## New Users

- Create an account
- Sign in as a user

## Registered Users

- View profile
- View all ride offers
- Create New ride offer
- View a specific ride offer
- Make a request to a ride offer
- View request to a ride offer
- Reject a request to a ride offer
- Accept a request to a ride offer

# Pivotal Tracker

Project is currently being built with the Project Management Tool, Pivotal Tracker. You can find the template at
https://www.pivotaltracker.com/n/projects/2178590

#Template
UI template is hosted at https://tomiadebanjo.github.io/ride-my-way/

#API v1 url
API v1 is hosted at https://ride-my-way-zaz.herokuapp.com

## API Endpoints

| Endpoint                                     | Functionality                   |
| -------------------------------------------- | ------------------------------- |
| POST /auth/signup                            | Register a user                 |
| POST /auth/login                             | Login a user                    |
| GET /rides                                   | Fetch all available rides       |
| GET /rides/\<rideId>                         | Fetch a single ride offer       |
| POST /users/rides                            | Create a Ride offer             |
| POST /rides/:rideId/requests                 | Make a request to join a ride   |
| GET /users/rides/:rideId/requests            | Register a user                 |
| PUT /users/rides/:rideId/requests/:requestId | Accept or reject a ride request |

## Build Setup

clone repo and cd into directory

git clone https://github.com/tomiadebanjo/ride-my-way.git

# install dependencies

npm install

#serve in development environment
npm run dev to use Nodemon

Nodemon watches for file changes and restarts your code.

# build for production

npm run build

## Testing

Prerequisites

- <a href="https://getpostman.com/">Postman</a>

Testing with Postman

- Navigate to localhost:9000 in postman.

Testing with coverage data

- npm run test

## contributions to the project

- Fork this repository to your github account
- Clone the repository - git clone https://github.com/{your_username_goes_here}/ride-my-way.git
- Create your feature branch - git checkout -b {feature, chore or bug}-short_feature_description
- Commit your changes - git commit -m “{commit_message_goes_here}“ or git commit for the interactive interface
- Push to the remote branch - git push origin {your_branch_name_as_described_above}
- Open a pull request

## AUTHOR

Tomi Adebanjo

## License

This is licensed for your use, modification and distribution under the [MIT license.](https://opensource.org/licenses/MIT)
