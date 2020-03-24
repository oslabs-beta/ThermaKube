function ServiceQuery(data) {
  // (this.name = data.body.items[0].metadata.name),
  // (this.type = data.body.items[0].spec.type),
  // (this.namespace = data.body.items[0].metadata.namespace),
  // (this.port = data.body.items[0].spec.ports[0].port),
  // (this.clusterIP = data.body.items[0].spec.clusterIP)
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

module.exports = { ServiceQuery };
