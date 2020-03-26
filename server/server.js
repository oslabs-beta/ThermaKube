const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');

const PodController = require('./controllers/PodController');
const NodeController = require('./controllers/NodeController');
const ServiceController = require('./controllers/ServiceController');
const AlertController = require('./controllers/AlertController');

app.use(cors());
app.use(express.json());

// testing to get pods from api
//changed to pods to test with postman
app.get('/getPods', PodController.getPods, (req, res) => {
  res.status(200).json(res.locals.pod);
});

// testing to get nodes from api
app.get('/getNodes', NodeController.getNodes, (req, res) => {
  res.status(200).json(res.locals.nodes);
});

// testing to get services from api
app.get('/getServices', ServiceController.getServices, (req, res) => {
  res.status(200).json(res.locals.service);
});

app.get('/podAlerts', AlertController.getAlerts, (req, res) => {
  res.status(200).json(res.locals.alerts);
});

app.post('/podAlerts', AlertController.addAlerts, (req, res) => {
  res.status(200).json(res.locals.alerts);
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
