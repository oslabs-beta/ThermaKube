const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');

const PodController = require('./controllers/PodController');

app.use(cors());
app.use(express.json());

// testing to get pods from api
app.get('/getPods', PodController.getPods, (req, res) => {
  res.status(200).json(res.locals.pod);
});

// serve html
app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'));
});
// catch all
app.use('/', (req, res) => {
  res.sendStatus(404);
});
// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}...`);
});
