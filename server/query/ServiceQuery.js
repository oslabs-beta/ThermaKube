function ServiceQuery(data) {
  this.name = [];
  this.type = [];
  this.namespace = [];
  this.port = [];
  this.clusterIP = [];

  // loop through body.items length
  for (let i = 0; i < data.body.items.length; i++) {
    (this.name[i] = data.body.items[i].metadata.name),
      (this.type[i] = data.body.items[i].spec.type),
      (this.namespace[i] = data.body.items[i].metadata.namespace),
      (this.port[i] = data.body.items[i].spec.ports[0].port),
      (this.clusterIP[i] = data.body.items[i].spec.clusterIP);
  }
}

function AwsServiceQuery(data) {
  this.name = [];
  this.type = [];
  this.namespace = [];
  this.port = [];
  this.clusterIP = [];

  // loop through body.items length
  for (let i = 0; i < data.items.length; i++) {
    (this.name[i] = data.items[i].metadata.name),
      (this.type[i] = data.items[i].spec.type),
      (this.namespace[i] = data.items[i].metadata.namespace),
      (this.port[i] = data.items[i].spec.ports[0].port),
      (this.clusterIP[i] = data.items[i].spec.clusterIP);
  }
}
module.exports = { ServiceQuery, AwsServiceQuery };
