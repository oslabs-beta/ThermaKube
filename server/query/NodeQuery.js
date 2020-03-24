function NodeQuery(data) {
  this.name = [];
  this.cpu = [];

  // loop through body.items length
  for (let i = 0; i < data.body.items.length; i++) {
    (this.name[i] = data.body.items[i].metadata.name),
      (this.cpu[i] = data.body.items[i].status.allocatable.cpu);
  }
}

module.exports = { NodeQuery };
