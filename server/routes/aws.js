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
  (req, res) => {
    res.status(200).json(res.locals.select);
  }
);

awsRouter.post('/nodes', AwsController.nodes, (req, res) => {
  res.status(200).json(res.locals.nodes);
});

module.exports = awsRouter;
