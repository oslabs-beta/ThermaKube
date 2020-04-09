const axios = require('axios');
const aws4 = require('aws4');
const { Base64 } = require('js-base64');
const request = require('request');
const { AwsPodQuery } = require('../query/PodQuery');
const { AwsNodeQuery } = require('../query/NodeQuery');
const { AwsServiceQuery } = require('../query/ServiceQuery');
const cmd = require('node-cmd');

const AwsController = {};

AwsController.authToken = async (req, res, next) => {
  console.log('in auth token');
  const credentials = {
    accessKeyId: req.body.credentials.accessKeyId,
    secretAccessKey: req.body.credentials.secretAccessKey,
  };
  const region = req.body.credentials.region;
  const name = req.body.cluster;
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
  res.locals.credentials = {
    accessKeyId: req.body.access.accessKeyId,
    secretAccessKey: req.body.access.secretAccessKey,
    region: req.body.access.region,
  };
  // create an options query
  const options = {
    host: `eks.${region}.amazonaws.com`,
    path: '/clusters',
  };
  // create query with custom aws signature
  const query = aws4.sign(options, credentials);
  try {
    const fetchCluster = await axios(
      `https://eks.${region}.amazonaws.com/clusters`,
      query
    );
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
    const fetchCluster = await axios(
      `https://eks.${region}.amazonaws.com/clusters/${name}`,
      { headers: query.headers }
    );
    res.locals.select = fetchCluster.data;
    res.locals.url = fetchCluster.data.cluster.endpoint;
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
  let awsPodArray = [];
  let awsPods;
  function callback(error, response, body) {
    if (error) {
      return 'error in aws pod request';
    } else {
      podInfo = JSON.parse(body);
      awsPods = new AwsPodQuery(podInfo);
      for (let i = 0; i < awsPods.name.length; i++) {
        let obj = {
          name: awsPods.name[i],
          namespace: awsPods.namespace[i],
          status: awsPods.status[i],
          podIP: awsPods.podIP[i],
          createdAt: awsPods.createdAt[i].toString(),
          nodeName: awsPods.nodeName[i],
        };
        awsPodArray.push(obj);
      }
      res.locals.awsPods = awsPodArray;
      return next();
    }
  }
  await request(options, callback);
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
  let awsNodes;
  let awsNodeArray = [];
  function callback(error, response, body) {
    if (error) {
      return 'error in aws node request';
    } else {
      nodeInfo = JSON.parse(body);
      awsNodes = new AwsNodeQuery(nodeInfo);
      for (let i = 0; i < awsNodes.name.length; i++) {
        let obj = {
          name: awsNodes.name[i],
          cpu: awsNodes.cpu[i],
        };
        awsNodeArray.push(obj);
      }
      res.locals.awsNodes = awsNodeArray;
      return next();
    }
  }
  await request(options, callback);
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
  let awsServices;
  let awsServiceArray = [];
  function callback(error, response, body) {
    if (error) {
      return 'error in aws service request';
    } else {
      serviceInfo = JSON.parse(body);
      awsServices = new AwsServiceQuery(serviceInfo);
      for (let i = 0; i < awsServices.name.length; i++) {
        let obj = {
          name: awsServices.name[i],
          type: awsServices.type[i],
          namespace: awsServices.namespace[i],
          port: awsServices.port[i],
          clusterIP: awsServices.clusterIP[i],
        };
        awsServiceArray.push(obj);
      }
      res.locals.awsServices = awsServiceArray;
      return next();
    }
  }
  await request(options, callback);
};

AwsController.getPodUsage = (req, res, next) => {
  //cmd library to access CLI
  //using kubectl top pod
  cmd.get('kubectl top pod', function (err, data, stderr) {
    if (err) return next(err);

    //split by enter
    const lines = data.split('\n');

    const result = [];
    for (let i = 1; i < lines.length - 1; i++) {
      //use regex, split string by any number of whitespaces
      const words = lines[i].match(/\S+/g);
      const podUse = { name: words[0], cpu: words[1], memory: words[2] };
      result.push(podUse);
    }
    res.locals.awsPodUsage = result;
    return next();
  });
};

module.exports = AwsController;
