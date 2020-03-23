const { kube } = require('../kubeconfig');
const { NodeQuery } = require('../query/NodeQuery');

const NodeController = {};

NodeController.getNodes = (req,res,next) => {
  console.log('test from inside NodeController');
  //get data from kube api
  kube.listNode('default').then(data => {
    const result = new NodeQuery(data);
    res.locals.nodes = result;
    //used to check the data coming back from query
    // console.log('from inside node controller')
    // res.locals.node = data.body.items[0].status.conditions.V1NodeCondition;
    // console.log(res.locals.node);
    return next();
  })
};

module.exports = NodeController;