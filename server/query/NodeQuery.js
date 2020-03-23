function NodeQuery(data) {
  (this.name = data.body.items[0].metadata.name),
  (this.cpu = data.body.items[0].status.allocatable.cpu)
}

module.exports = { NodeQuery };