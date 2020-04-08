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
  // const region = req.body.access.region;
  const name = req.body.cluster;
  console.log(credentials, name);
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
  res.locals.token = authToken;
  const authHeader = { Authorization: `Bearer ${authToken}` };

  try {
    console.log('in auth');
    // let request = new XMLHttpRequest();
    // console.log('in req');
    // request.open(
    //   'GET',
    //   `https://1B1FB10C58543E60F838BC50382EA90F.sk1.us-east-2.eks.amazonaws.com/api/v1/pods`,
    //   true
    // );
    // request.setRequestHeader('Authorization', 'Bearer' + authToken);
    // console.log('set header');
    // request.send();
    // request.onload = function () {
    //   console.log('in on load');
    //   let res = JSON.parse(request.response);
    //   console.log('res', res);
    // };
    // request.onerror = function () {
    //   console.log('error in xmlhttp');
    // };

    //AXIOS
    // const podInfo = await axios(
    //   `https://1B1FB10C58543E60F838BC50382EA90F.sk1.us-east-2.eks.amazonaws.com/api/v1/pods`,
    //   {
    //     headers: authHeader,
    //     rejectUnauthorized: false,
    //   }
    // );

    //HTTP
    // const podQuery = {
    //   hostname: `https://1B1FB10C58543E60F838BC50382EA90F.sk1.us-east-2.eks.amazonaws.com/api/v1/pods`,
    //   rejectUnauthorized: false,
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // };
    // https
    //   .get(podQuery, (response) => {
    //     console.log('in res');
    //     let result = '';
    //     repsonse.on('data', function (chunk) {
    //       result += chunk;
    //     });
    //     response.on('end', function () {
    //       console.log(result);
    //     });
    //   })
    //   .on('error', (err) => {
    //     console.log('error in http');
    //   });

    //REQUEST
    const req = {
      uri: `https://1B1FB10C58543E60F838BC50382EA90F.sk1.us-east-2.eks.amazonaws.com/api/v1/pods`,
      rejectUnauthorized: false,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    function callback(error, response, body) {
      if (error) {
        return 'error in aws pod request';
      } else {
        const podInfo = JSON.parse(body);
        console.log('podInfo', podInfo.items);
      }
    }
    await request(req, callback);
    console.log('pod fetch success');
    return next();
  } catch (err) {
    return 'error in token middleware';
  }
  // return next();
};

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
    console.log('clusterData', fetchCluster.data);
    return next();
  } catch (err) {
    return 'error in aws middleware';
  }
};

AwsController.nodes = async (req, res, next) => {
  console.log('in aws nodes middleware');
  const credentials = {
    accessKeyId: req.body.credentials.accessKeyId,
    secretAccessKey: req.body.credentials.secretAccessKey,
  };
  const region = req.body.credentials.region;
  const name = req.body.cluster;
  // create an options query
  const options = {
    host: `eks.${region}.amazonaws.com`,
    path: `/clusters/${name}/node-groups`,
  };
  // create query with custom aws signature
  const query = aws4.sign(options, credentials);
  try {
    console.log(query);
    const fetchCluster = await axios(
      `https://eks.${region}.amazonaws.com/clusters/${name}/node-groups`,
      query
    );
    console.log(fetchCluster.data);
    res.locals.nodes = fetchCluster.data;
    console.log(res.locals.nodes);
    return next();
  } catch (err) {
    return 'error in aws middleware';
  }
};

AwsController.pods = async (req, res, next) => {};

module.exports = AwsController;
