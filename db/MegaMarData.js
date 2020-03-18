/**
 *
 *
 * Data for test application will go here
 *
 * http://localhost:8081/api/v1/namespaces/default/pods
 */
const MegaMarData = {
  kind: "PodList",
  apiVersion: "v1",
  metadata: {
    selfLink: "/api/v1/namespaces/default/pods",
    resourceVersion: "1432324",
  },
  items: [
    {
      metadata: {
        name: "megamarkets-58c64cc5b5-kmhxr",
        generateName: "megamarkets-58c64cc5b5-",
        namespace: "default",
        selfLink:
          "/api/v1/namespaces/default/pods/megamarkets-58c64cc5b5-kmhxr",
        uid: "5d99d461-67c8-11ea-a618-42010aa80044",
        resourceVersion: "1005162",
        creationTimestamp: "2020-03-16T20:54:44Z",
        labels: {
          "pod-template-hash": "58c64cc5b5",
          run: "megamarkets",
        },
        annotations: {
          "kubernetes.io/limit-ranger":
            "LimitRanger plugin set: cpu request for container megamarkets",
        },
        ownerReferences: [
          {
            apiVersion: "apps/v1",
            kind: "ReplicaSet",
            name: "megamarkets-58c64cc5b5",
            uid: "892f2617-6580-11ea-a57c-42010aa80153",
            controller: true,
            blockOwnerDeletion: true,
          },
        ],
      },
      spec: {
        volumes: [
          {
            name: "default-token-bvmsc",
            secret: {
              secretName: "default-token-bvmsc",
              defaultMode: 420,
            },
          },
        ],
        containers: [
          {
            name: "megamarkets",
            image: "ckimdocker/mm-prod",
            ports: [
              {
                containerPort: 3000,
                protocol: "TCP",
              },
            ],
            resources: {
              requests: {
                cpu: "100m",
              },
            },
            volumeMounts: [
              {
                name: "default-token-bvmsc",
                readOnly: true,
                mountPath: "/var/run/secrets/kubernetes.io/serviceaccount",
              },
            ],
            terminationMessagePath: "/dev/termination-log",
            terminationMessagePolicy: "File",
            imagePullPolicy: "Always",
          },
        ],
        restartPolicy: "Always",
        terminationGracePeriodSeconds: 30,
        dnsPolicy: "ClusterFirst",
        serviceAccountName: "default",
        serviceAccount: "default",
        nodeName: "gke-megamarkets-default-pool-b8d7d8f9-59c8",
        securityContext: {},
        schedulerName: "default-scheduler",
        tolerations: [
          {
            key: "node.kubernetes.io/not-ready",
            operator: "Exists",
            effect: "NoExecute",
            tolerationSeconds: 300,
          },
          {
            key: "node.kubernetes.io/unreachable",
            operator: "Exists",
            effect: "NoExecute",
            tolerationSeconds: 300,
          },
        ],
        priority: 0,
        enableServiceLinks: true,
      },
      status: {
        phase: "Running",
        conditions: [
          {
            type: "Initialized",
            status: "True",
            lastProbeTime: null,
            lastTransitionTime: "2020-03-17T07:37:11Z",
          },
          {
            type: "Ready",
            status: "True",
            lastProbeTime: null,
            lastTransitionTime: "2020-03-17T07:38:08Z",
          },
          {
            type: "ContainersReady",
            status: "True",
            lastProbeTime: null,
            lastTransitionTime: "2020-03-17T07:38:08Z",
          },
          {
            type: "PodScheduled",
            status: "True",
            lastProbeTime: null,
            lastTransitionTime: "2020-03-17T07:37:11Z",
          },
        ],
        hostIP: "10.168.0.48",
        podIP: "10.56.1.2",
        startTime: "2020-03-17T07:37:11Z",
        containerStatuses: [
          {
            name: "megamarkets",
            state: {
              running: {
                startedAt: "2020-03-17T07:38:07Z",
              },
            },
            lastState: {},
            ready: true,
            restartCount: 0,
            image: "ckimdocker/mm-prod:latest",
            imageID:
              "docker-pullable://ckimdocker/mm-prod@sha256:42170601e260c0585b1f7faf293b83ffb3d1c0cd114721b8ebf625fc561ace24",
            containerID:
              "docker://1567a9aa8617999ca237d31fcc5934361b760fdfa57c51a0cd7ab84bdca9d563",
          },
        ],
        qosClass: "Burstable",
      },
    },
  ],
};
