# ThermaKube

ThermaKube is an open-source Kubernetes web application that monitors the health and performance of Kubernetes clusters with support for AWS EKS deployments. It tracks real-time data, renders visualization of clusters, and has alerts for when pods within the clusters crash.

## Getting Started
**Prerequisites:** In order to properly use ThermaKube, have your Kubernetes cluster deployed and kubectl configured.
To check the location and credentials that kubectl knows about, use the following command:
```
kubectl config view
```
Alternatively, you can refer to the offical K8s documents for more [information](https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/).

You can either use your Kubernetes configured on your desktop, or you can login and use Kubernetes cluster deployed on AWS.

## How to Use
ThermaKube is a client-side application available via the browser at https://thermakube.com. You can navigate to different sections or pages to look at cluster information in different ways.

**Cluster Information**

* Displays data on pods, nodes and services within a single cluster in a easy-to-view, compact table format.

**Visualizer**

* Renders a radial tree of a cluster that shows relationships between pods, nodes and services with conditional coloring to mirror how kube-proxy directs incoming requests through services. 

**Alerts**

* Displays the name, time, and current status of pods that have crashed.

## Contributing
We love feedback and are always looking to improve! For any major chaanges, please open an issue and discuss what you would like to change. Pull requests are welcome.

## Authors

* Clara Kim - [@clarakm](https://github.com/clarakm)
* Elie Baik - [@semtemp](https://github.com/semtemp)
* Evan Amoranto - [@eamoranto](https://github.com/eamoranto)
* Kritika Sah - [@hellokritty](https://github.com/hellokritty)
* Nick Primuth - [@nickprimuth](https://github.com/nickprimuth)
