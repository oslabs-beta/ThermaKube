const express = require('express');

const awsRouter = express.Router();

const AwsController = require('../controllers/AwsController');

awsRouter.post('/clusters', AwsController.cluster, (req, res) => {
  res.status(200).json(res.locals.clusters);
});

module.exports = awsRouter;
