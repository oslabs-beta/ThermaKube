const { kube } = require('../kubeconfig');
const { NodeQuery } = require('../query/NodeQuery');

const NodeController = {};

NodeController.getNodes = (req, res, next) => {
  // console.log('test from inside NodeController');
  //get data from kube api
  kube.listNode('default').then(data => {
    const result = new NodeQuery(data);
    const nodeArray = [];
    for (let i = 0; i < result.name.length; i++) {
      let obj = {
        name: result.name[i],
        cpu: result.cpu[i],
      };
      nodeArray.push(obj);
    }
    // console.log('nodeArr', nodeArray);
    res.locals.nodes = nodeArray;
    return next();
  });
};

module.exports = NodeController;
