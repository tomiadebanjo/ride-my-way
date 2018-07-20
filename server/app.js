import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import router from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', router);

app.get('/', (req, res) => {
  res.status(200).json('Welcome to Ride My Way!');
});

app.get('/api/v1', (req, res) => {
  res.status(200).json('Welcome to Ride My Way API v1');
});

app.all('*', (req, res) => res.status(404).json({
  message: 'wrong endpoint: visit api with api/v1/signup',
}));

const port = process.env.PORT || 9000;
app.listen(port);

export default app;
