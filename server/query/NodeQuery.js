function NodeQuery(data) {
  (this.name = data.body.items[2].metadata.name),
    (this.cpu = data.body.items[2].status.allocatable.cpu);
}

module.exports = { NodeQuery };
