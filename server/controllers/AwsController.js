const axios = require('axios');
const aws4 = require('aws4');

const AwsController = {};

AwsController.cluster = async (req, res, next) => {
  console.log('in aws cluster middleware');
  // access credentials and region should be in the request
  const credentials = {
    accessKeyId: req.body.access.accessKeyId,
    secretAccessKey: req.body.access.secretAccessKey,
  };
  const region = req.body.access.region;
  // create an options query
  const options = {
    host: `eks.${region}.amazonaws.com`,
    path: '/clusters',
  };
  // create query with custom aws signature
  const query = aws4.sign(options, credentials);
  try {
    console.log(query);
    const fetchCluster = await axios(
      `https://eks.${region}.amazonaws.com/clusters`,
      query
    );
    console.log('data', fetchCluster.data);
    res.locals.clusters = fetchCluster.data.clusters;
    return next();
  } catch (err) {
    return 'error in aws middleware';
  }
};

AwsController.selectCluster = async (req, res, next) => {
  console.log('in select middleware');
  const credentials = {
    accessKeyId: req.body.credentials.accessKeyId,
    secretAccessKey: req.body.credentials.secretAccessKey,
  };
  const region = req.body.credentials.region;
  const name = req.body.cluster;
  // create an options query
  const options = {
    host: `eks.${region}.amazonaws.com`,
    path: `/clusters/${name}`,
  };
  // create query with custom aws signature
  const query = aws4.sign(options, credentials);
  try {
    console.log(query);
    const fetchCluster = await axios(
      `https://eks.${region}.amazonaws.com/clusters/${name}`,
      query
    );
    res.locals.select = fetchCluster.data;
    return next();
  } catch (err) {
    return 'error in aws middleware';
  }
};

module.exports = AwsController;
