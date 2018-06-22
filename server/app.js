import express from 'express';
import bodyParser from 'body-parser';
// import router from './routes/index';
import logger from 'morgan';
// const express = require ('express');
// const bodyParser = require('body-parser');
// const logger = require('morgan');
// import router from './routes/index';
const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', router);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
