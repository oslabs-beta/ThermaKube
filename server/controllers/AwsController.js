const axios = require('axios');
const aws4 = require('aws4');
const { Base64 } = require('js-base64');
const request = require('request');

const AwsController = {};

AwsController.authToken = async (req, res, next) => {
  console.log('in auth token');

  const credentials = {
    accessKeyId: req.body.credentials.accessKeyId,
    secretAccessKey: req.body.credentials.secretAccessKey,
  };
  const region = req.body.credentials.region;
  const name = req.body.cluster;
  console.log(credentials, name, region);
  const options = {
    host: 'sts.amazonaws.com',
    service: 'sts',
    path: '/?Action=GetCallerIdentity&Version=2011-06-15&X-Amz-Expires=60',
    headers: {
      'x-k8s-aws-id': name,
    },
    signQuery: true,
  };
  const query = aws4.sign(options, credentials);
  const signedUrl = `https://${query.host}${query.path}`;
  const encoded = Base64.encodeURI(signedUrl);
  const token = encoded.replace(/=+$/, '');
  const authToken = `k8s-aws-v1.${token}`;
  res.locals.awsInfo = {
    credentials: credentials,
    name: name,
    region: region,
    token: authToken,
  };
  console.log(res.locals.awsInfo);
  return next();
};

// fetch all AWS clusters associated to user
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
    // console.log('data', fetchCluster.data);
    res.locals.clusters = fetchCluster.data.clusters;
    return next();
  } catch (err) {
    return 'error in aws middleware';
  }
};

// Select AWS cluster
AwsController.selectCluster = async (req, res, next) => {
  console.log('in aws select middleware');
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
      { headers: query.headers }
    );
    res.locals.select = fetchCluster.data;
    res.locals.url = fetchCluster.data.cluster.endpoint;
    console.log('clusterData', fetchCluster.data);
    return next();
  } catch (err) {
    return 'error in aws middleware';
  }
};

// fetch AWS pods
AwsController.getPods = async (req, res, next) => {
  console.log('in aws get pods');
  const options = {
    uri: `${res.locals.url}/api/v1/pods`,
    rejectUnauthorized: false,
    headers: {
      Authorization: `Bearer ${res.locals.awsInfo.token}`,
    },
  };
  let podInfo;
  function callback(error, response, body) {
    if (error) {
      return 'error in aws pod request';
    } else {
      podInfo = JSON.parse(body);
      console.log('podInfo', podInfo.items);
    }
  }
  await request(options, callback);
  console.log('pod fetch success');
  res.locals.awsPods = podInfo;
  return next();
};

AwsController.getNodes = async (req, res, next) => {
  console.log('in aws get nodes');
  const options = {
    uri: `${res.locals.url}/api/v1/nodes`,
    rejectUnauthorized: false,
    headers: {
      Authorization: `Bearer ${res.locals.awsInfo.token}`,
    },
  };
  let nodeInfo;
  function callback(error, response, body) {
    if (error) {
      return 'error in aws node request';
    } else {
      nodeInfo = JSON.parse(body);
      console.log('nodeInfo', nodeInfo.items);
    }
  }
  await request(options, callback);
  console.log('node fetch success');
  res.locals.awsNodes = nodeInfo;
  return next();
};

AwsController.getServices = async (req, res, next) => {
  console.log('in aws get services');
  const options = {
    uri: `${res.locals.url}/api/v1/services`,
    rejectUnauthorized: false,
    headers: {
      Authorization: `Bearer ${res.locals.awsInfo.token}`,
    },
  };
  let serviceInfo;
  function callback(error, response, body) {
    if (error) {
      return 'error in aws service request';
    } else {
      serviceInfo = JSON.parse(body);
      console.log('serviceInfo', serviceInfo.items);
    }
  }
  await request(options, callback);
  console.log('service fetch success');
  res.locals.awsServices = serviceInfo;
  return next();
};

module.exports = AwsController;
