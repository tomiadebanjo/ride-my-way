import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './routes';

const app = express();

app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Welcome to Ride My Way!');
});

const port = process.env.PORT || 9000;
app.listen(port);

export default app;
