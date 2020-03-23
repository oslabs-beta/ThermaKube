// API from the Kubernetes JavaScrip Client Library
const k8Api = require('@kubernetes/client-node');

// Create an empty config file
const kubeConfig = new k8Api.KubeConfig();

//  Load the default config file, whichever kubectl is connected to
kubeConfig.loadFromDefault();

//  Use the existing config to connect to cluster
const kube = kubeConfig.makeApiClient(k8Api.CoreV1Api);


module.exports = { kube };
