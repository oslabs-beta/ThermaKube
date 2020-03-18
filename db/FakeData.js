/*
 *
 * BELOW IS SHIPM8'S FAKE DATA
 *
 */

// AwsApi.fetchPodInfo(`https://56A5C5E4A41FCDF92D169B33AB0A5A5F.sk1.us-west-2.eks.amazonaws.com`, 'default', 'repark-deployment-7997f8b86d-4k5dd', 'awsTestCluster1')
//   .then(res => console.log(res.spec.containers[0]))
// gray #EFEFF4
/***/
const fetchPods = {
  apiVersion: 'v1',
  kind: 'Pod',
  metadata: {
    annotations: {
      'kubernetes.io/psp': 'eks.privileged',
    },
    creationTimestamp: '2020-01-29T00:27:40Z',
    generateName: 'repark-deployment-7997f8b86d-',
    labels: {
      'pod-template-hash': '7997f8b86d',
      repark: 'web',
    },
    name: 'repark-deployment-7997f8b86d-4k5dd',
    namespace: 'default',
    ownerReferences: [[Object]],
    resourceVersion: '5456',
    selfLink:
      '/api/v1/namespaces/default/pods/repark-deployment-7997f8b86d-4k5dd',
    uid: '287db3d7-422e-11ea-a037-02b853562b6a',
  },
  spec: {
    containers: [[Object]],
    dnsPolicy: 'ClusterFirst',
    enableServiceLinks: true,
    priority: 0,
    restartPolicy: 'Always',
    schedulerName: 'default-scheduler',
    securityContext: {},
    serviceAccount: 'default',
    serviceAccountName: 'default',
    terminationGracePeriodSeconds: 30,
    tolerations: [[Object], [Object]],
    volumes: [[Object]],
  },
  status: {
    conditions: [[Object]],
    phase: 'Pending',
    qosClass: 'BestEffort',
  },
};

// metadata.ownerReferences: [{"apiVersion": "apps/v1", "blockOwnerDeletion": true, "controller": true, "kind": "ReplicaSet", "name": "repark-deployment-7997f8b86d", "uid": "287b9558-422e-11ea-a037-02b853562b6a"}]

// spec: {"containers": [{"image": "051216103138.dkr.ecr.us-west-2.amazonaws.com/repark/repark:1.1", "imagePullPolicy": "IfNotPresent", "name": "repark-site", "resources": [Object], "terminationMessagePath":
//       "/dev/termination-log", "terminationMessagePolicy": "File", "volumeMounts": [Array]}], "dnsPolicy": "ClusterFirst", "enableServiceLinks": true, "priority": 0, "restartPolicy": "Always",
//       "schedulerName": "default-scheduler", "securityContext": {}, "serviceAccount": "default", "serviceAccountName": "default", "terminationGracePeriodSeconds": 30, "tolerations": [{"effect": "NoExecute",
//       "key": "node.kubernetes.io/not-ready", "operator": "Exists", "tolerationSeconds": 300}, {"effect": "NoExecute",
//       "key": "node.kubernetes.io/unreachable", "operator": "Exists", "tolerationSeconds": 300}], "volumes": [{"name": "default-token-5rr84", "secret": [Object]}]}

// spec.containers: [{"image": "051216103138.dkr.ecr.us-west-2.amazonaws.com/repark/repark:1.1", "imagePullPolicy": "IfNotPresent", "name": "repark-site", "resources": {},
//                  "terminationMessagePath": "/dev/termination-log", "terminationMessagePolicy": "File", "volumeMounts": [[Object]]}]

// spec.containers[0]: {"image": "051216103138.dkr.ecr.us-west-2.amazonaws.com/repark/repark:1.1", "imagePullPolicy": "IfNotPresent", "name": "repark-site", "resources": {},
//                     "terminationMessagePath": "/dev/termination-log", "terminationMessagePolicy": "File", "volumeMounts": [{"mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
//                     "name": "default-token-5rr84", "readOnly": true}]}

const GoogleCloudApigetProjects = {
  projects: [
    {
      createTime: '2020-01-18T20:27:17.915Z',
      lifecycleState: 'ACTIVE',
      name: 'My Project 66285',
      projectId: 'primordial-saga-265520',
      projectNumber: '535704856722',
    },
    {
      createTime: '2020-01-14T22:42:41.634Z',
      lifecycleState: 'ACTIVE',
      name: 'Learning Kubernetes',
      projectId: 'learning-kubernetes-265122',
      projectNumber: '1048432399638',
    },
  ],
};
