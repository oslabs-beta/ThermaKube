// constructor function for first pod
function PodQuery(data) {
  (this.name = data.body.items[0].metadata.name),
    (this.namespace = data.body.items[0].metadata.namespace),
    (this.status = data.body.items[0].status.phase),
    (this.podIP = data.body.items[0].status.podIP),
    (this.createdAt = data.body.items[0].status.startTime);
}

module.exports = { PodQuery };
