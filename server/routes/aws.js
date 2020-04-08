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
  (req, res) => {
    res.status(200).json(res.locals.select);
  }
);

module.exports = awsRouter;
