# ride-my-way

![Build Status](https://travis-ci.org/tomiadebanjo/ride-my-way.svg?branch=develop) [![Coverage Status](https://coveralls.io/repos/github/tomiadebanjo/ride-my-way/badge.svg?branch=develop)](https://coveralls.io/github/tomiadebanjo/ride-my-way?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/6a77aac0d9e850e8ffdd/maintainability)](https://codeclimate.com/github/tomiadebanjo/ride-my-way/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/6a77aac0d9e850e8ffdd/test_coverage)](https://codeclimate.com/github/tomiadebanjo/ride-my-way/test_coverage)

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

# Pivotal Tracker

Project is currently being built with the Project Management Tool, Pivotal Tracker. You can find the template at
https://www.pivotaltracker.com/n/projects/2178590

#Template
UI template is hosted at https://tomiadebanjo.github.io/ride-my-way/UI

## API Endpoints

| Endpoint                       | Functionality                 |
| ------------------------------ | ----------------------------- |
| GET /rides                     | Fetch all rides               |
| GET /rides/\<rideId>           | Fetch a single ride offer     |
| POST /rides                    | Create a Ride offer           |
| POST /rides/\<rideId>/requests | Make a request to join a ride |

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

## AUTHOR

Tomi Adebanjo
