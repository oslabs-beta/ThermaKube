const { kube } = require('../kubeconfig');
const { ServiceQuery } = require('../query/ServiceQuery');

const ServiceController = {};

ServiceController.getServices = (req, res, next) => {
  console.log('test from inside ServiceController');
  //get data from kube api
  kube.listNamespacedService('default').then(data => {
    const result = new ServiceQuery(data);
    const serviceArray = [];
    for (let i = 0; i < result.name.length; i++) {
      let obj = {
        name: result.name[i],
        type: result.type[i],
        namespace: result.namespace[i],
        port: result.port[i],
        clusterIP: result.clusterIP[i],
      };
      serviceArray.push(obj);
    }
    res.locals.service = serviceArray;

    // //used to check the data coming back from query
    // console.log('from inside service controller')
    // res.locals.service = data.body.items[0].spec.clusterIP;
    // console.log(res.locals.service);
    return next();
  });
};

module.exports = ServiceController;
