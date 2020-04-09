// constructor function for first pod
function PodQuery(data) {
  // assign all variables as empty array
  this.name = [];
  this.namespace = [];
  this.status = [];
  this.podIP = [];
  this.createdAt = [];
  this.nodeName = [];
  this.labels = [];

  // loop through body.items length
  for (let i = 0; i < data.body.items.length; i++) {
    (this.name[i] = data.body.items[i].metadata.name),
      (this.namespace[i] = data.body.items[i].metadata.namespace),
      (this.status[i] = data.body.items[i].status.phase),
      (this.podIP[i] = data.body.items[i].status.podIP),
      (this.createdAt[i] = data.body.items[i].status.startTime),
      (this.nodeName[i] = data.body.items[i].spec.nodeName),
      (this.labels[i] = data.body.items[i].metadata.labels.run);
  }
}

function AwsPodQuery(data) {
  this.name = [];
  this.namespace = [];
  this.status = [];
  this.podIP = [];
  this.createdAt = [];
  this.nodeName = [];

  for (let i = 0; i < data.items.length; i++) {
    (this.name[i] = data.items[i].metadata.name),
      (this.namespace[i] = data.items[i].metadata.namespace),
      (this.status[i] = data.items[i].status.phase),
      (this.podIP[i] = data.items[i].status.podIP),
      (this.createdAt[i] = data.items[i].metadata.creationTimestamp),
      (this.nodeName[i] = data.items[i].spec.nodeName);
  }
}

module.exports = { PodQuery, AwsPodQuery };
