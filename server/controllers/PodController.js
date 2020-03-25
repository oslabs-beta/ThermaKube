const { kube } = require('../kubeconfig');
const { PodQuery } = require('../query/PodQuery');

const PodController = {};

// middleware to get pods upon loading the home page
PodController.getPods = (req, res, next) => {
  // grabbing data from kube api
  kube.listNamespacedPod('default').then(data => {
    // create new object with retrieved data - result will now containe pod name, namespace, status, ip address, and createdAt
    const result = new PodQuery(data);
    const podArray = [];
    for (let i = 0; i < result.name.length; i++) {
      let obj = {
        name: result.name[i],
        namespace: result.namespace[i],
        status: result.status[i],
        podIP: result.podIP[i],
        createdAt: result.createdAt[i].toString(),
        nodeName: result.nodeName[i],
        labels: result.labels[i],
      };
      podArray.push(obj);
    }
    // console.log('podArr', podArray);
    // store in res.locals
    res.locals.pod = podArray;
    return next();
  });
};

module.exports = PodController;
