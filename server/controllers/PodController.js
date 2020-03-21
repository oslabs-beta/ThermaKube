const { kube } = require('../kubeconfig');
const { PodQuery } = require('../query/PodQuery');

const PodController = {};

// middleware to get pods upon loading the home page
PodController.getPods = (req, res, next) => {
  console.log('in test controller');
  // grabbing data from kube api
  kube.listNamespacedPod('default').then(data => {
    // create new object with retrieved data - result will now containe pod name, namespace, status, ip address, and createdAt
    const result = new PodQuery(data);
    // store in res.locals
    res.locals.pod = result;
    return next();
  });
};

module.exports = PodController;
