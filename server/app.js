import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

// import router from './routes/index';
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', router);
app.get("/", (req, res) => res.send('Hello World'));


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
