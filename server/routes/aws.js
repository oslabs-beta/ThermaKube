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
  AwsController.getPodUsage,
  (req, res) => {
    res.status(200).json({
      pods: res.locals.awsPods,
      nodes: res.locals.awsNodes,
      services: res.locals.awsServices,
      podUsage: res.locals.awsPodUsage,
    });
  }
);

module.exports = awsRouter;
