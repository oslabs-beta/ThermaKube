const express = require('express');

const awsRouter = express.Router();

const AwsController = require('../controllers/AwsController');

awsRouter.post('/clusters', AwsController.cluster, (req, res) => {
  res.status(200).json(res.locals.clusters);
});

awsRouter.post(
  '/select',
  AwsController.selectCluster,
  AwsController.authToken,
  AwsController.getPods,
  AwsController.getNodes,
  AwsController.getServices,
  (req, res) => {
    res.status(200).json(res.locals.select);
  }
);

awsRouter.get('/pods', AwsController.getPods, (req, res) => {
  res.status(200).json(res.locals.awsPods);
});

awsRouter.get('/nodes', AwsController.getNodes, (req, res) => {
  res.status(200).json(res.locals.awsNodes);
});

awsRouter.get('/services', AwsController.getServices, (req, res) => {
  res.status(200).json(res.locals.awsServices);
});

module.exports = awsRouter;
