const { kube } = require('../kubeconfig');
const { ServiceQuery } = require('../query/ServiceQuery');

const ServiceController = {};

ServiceController.getServices = (req,res,next) => {
  console.log('test from inside ServiceController');
  //get data from kube api
  kube.listNamespacedService('default').then(data => {
    const result = new ServiceQuery(data);
    res.locals.service = result;

    // //used to check the data coming back from query
    // console.log('from inside service controller')
    // res.locals.service = data.body.items[0].spec.clusterIP;
    // console.log(res.locals.service);
    return next();
  })
};

module.exports = ServiceController;