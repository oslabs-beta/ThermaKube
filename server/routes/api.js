const express = require('express');

const apiRouter = express.Router();

const PodController = require('../controllers/PodController');
const NodeController = require('../controllers/NodeController');
const ServiceController = require('../controllers/ServiceController');
const AlertController = require('../controllers/AlertController');
const CookieController = require('../controllers/CookieController');
const AlertsController = require('../controllers/AlertsController');

// fetch pods from K8 Api
apiRouter.get(
  '/pods',
  PodController.getPods,
  PodController.getPodUsage,
  (req, res) => {
    // console.log('res.local.usage', res.locals.usage);
    // res.status(200).json(res.locals.pod);
    res.status(200).json({ pod: res.locals.pod, usage: res.locals.usage });
  }
);

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

apiRouter.get(
  '/alerts',
  CookieController.verifyToken,
  AlertsController.getAlerts,
  (req, res) => {
    res.status(200).json(res.locals.alerts);
  }
);

apiRouter.post(
  '/alerts',
  CookieController.verifyToken,
  AlertsController.addAlerts,
  (req, res) => {
    res.status(200).json(res.locals.alert);
  }
);

// add a new alert to db
apiRouter.post('/podAlerts', AlertController.addAlerts, (req, res) => {
  res.status(200).json(res.locals.alerts);
});

module.exports = apiRouter;
