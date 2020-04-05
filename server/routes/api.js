const express = require('express');

const apiRouter = express.Router();

const PodController = require('../controllers/PodController');
const NodeController = require('../controllers/NodeController');
const ServiceController = require('../controllers/ServiceController');
const AlertController = require('../controllers/AlertController');

// fetch pods from K8 Api
apiRouter.get('/pods', PodController.getPods, (req, res) => {
  res.status(200).json(res.locals.pod);
});

// fetch nodes from K8 Api
apiRouter.get('/nodes', NodeController.getNodes, (req, res) => {
  res.status(200).json(res.locals.nodes);
});

// fetch services from K8 Api
apiRouter.get('/services', ServiceController.getServices, (req, res) => {
  res.status(200).json(res.locals.service);
});

// fetch alerts from db
apiRouter.get('/podAlerts', AlertController.getAlerts, (req, res) => {
  res.status(200).json(res.locals.alerts);
});

// add a new alert to db
apiRouter.post('/podAlerts', AlertController.addAlerts, (req, res) => {
  res.status(200).json(res.locals.alerts);
});

module.exports = apiRouter;
