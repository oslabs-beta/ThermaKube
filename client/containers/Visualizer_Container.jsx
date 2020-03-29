//traffic view of kubernetes clusters/individual pods
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RadialTree from '../components/visualizer/RadialTree.jsx';
import DashBoard from '../components/Dashboard.jsx';

const Visualizer = () => {
  let [data, setData] = useState([]);
  let [pod, setPod] = useState([]);
  let [node, setNode] = useState([]);
  let [service, setService] = useState([]);

  // getPods, getNodes, getServices:
  // helper functions for formating fetched info for d3 visualization
  function getPods(parent) {
    const podArr = [];
    for (let i = 0; i < pod.length; i++) {
      //check node name passed thru parameter against pod's nodeName
      if (parent == pod[i].nodeName) {
        const podObj = {};
        podObj.name = pod[i].name;
        podObj.namespace = pod[i].namespace;
        podObj.status = pod[i].status;
        podObj.podIP = pod[i].podIP;
        podObj.createdAt = pod[i].createdAt;
        podObj.parent = pod[i].nodeName;
        podObj.labels = pod[i].labels;
        podArr.push(podObj);
      }
    }
    return podArr;
  }

  function getNodes() {
    const nodeArr = [];
    for (let i = 0; i < node.length; i++) {
      const nodeObj = {};
      nodeObj.name = node[i].name;
      //pods/children related to the node
      nodeObj.children = getPods(node[i].name);
      nodeArr.push(nodeObj);
    }
    return nodeArr;
  }

  function getServices() {
    const serviceArr = [];
    for (let i = 0; i < service.length; i++) {
      //skip the clusterIP service for now
      if (service[i].type === 'ClusterIP') continue;

      const serviceObj = {};
      //copy all info from services into serviceObj
      serviceObj.name = service[i].name;
      serviceObj.type = service[i].type;
      serviceObj.namespace = service[i].namespace;
      serviceObj.port = service[i].port;
      serviceObj.clusterIP = service[i].clusterIP;
      //nodes/children related to the service
      serviceObj.children = getNodes();
      serviceArr.push(serviceObj);
    }
    return serviceArr;
  }

  useEffect(() => {
    // fetch service, node, pod info
    const fetchInfo = async () => {
      service = [];
      node = [];
      pod = [];

      const serviceReq = axios.get('/getServices');
      const nodeReq = axios.get('/getNodes');
      const podReq = axios.get('/getPods');

      const res = await axios.all([serviceReq, nodeReq, podReq]);

      const serviceRes = res[0].data;
      const nodeRes = res[1].data;
      const podRes = res[2].data;

      setService(service.push(...serviceRes));
      setNode(node.push(...nodeRes));
      setPod(pod.push(...podRes));

      //const dataRes = getServices();
      //setData(data.push(...dataRes)); //doesn't work????
      setData(getServices()); //set data
    };
    // fetchInfo();
    const fetchOnLoad = () => {
      if (!data[0]) {
        // console.log('First fetch called');
        fetchInfo();
      }
      setInterval(() => {
        // console.log('setInterval called');
        fetchInfo();
      }, 5000);
    };

    fetchOnLoad();
  }, []);

  return (
    <div className='appCont'>
      <DashBoard />
      <div className='visContainer'>
        <h4>Traffic Visualizer</h4>
        <RadialTree data={data} />
      </div>
    </div>
  );
};

export default Visualizer;
