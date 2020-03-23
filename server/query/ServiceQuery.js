function ServiceQuery(data) {
  (this.name = data.body.items[0].metadata.name),
  (this.type = data.body.items[0].spec.type),
  (this.namespace = data.body.items[0].metadata.namespace),
  (this.port = data.body.items[0].spec.ports[0].port),
  (this.clusterIP = data.body.items[0].spec.clusterIP)
}

module.exports = { ServiceQuery };