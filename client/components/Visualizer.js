//traffic view of kubernetes clusters/individual pods
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import TreeChart from './TreeChart';
import RadialTree from './RadialTree';

const Visualizer = () => {
  let [data, setData] = useState([]);
  let [pod, setPod] = useState([])
  let [node, setNode] = useState([])
  let [service, setService] = useState([])

  useEffect(() => { 
    // fetch service, node, pod info
    const fetchInfo = async () => {
      const serviceRes = await axios.get('/getServices');
      //setService(service.push(serviceRes.data));
      setService(service.push(serviceRes.data));
      console.log('services useEffect1', service)

      const nodeRes = await axios.get('/getNodes');
      setNode(node.push(nodeRes.data));
      console.log('nodes useEff1', node)

      const podRes = await axios.get('/getPods');
      setPod(pod.push(podRes.data));
      console.log('pod useEff1', pod)
    };
    fetchInfo();

    // render fetched info into appropriate format for d3 rendering
    for (let i = 0; i < service.length; i++) {
      const serviceObj = {};
      serviceObj.name = service[i].name;
      serviceObj.type = service[i].type;
      data.push(serviceObj);
      setData(data);
    }
    console.log('data at end of useEff1', data);
  }, [])

  useEffect(() => { 
    // console.log('service in useEffec2', service);
    // for (let i = 0; i < service.length; i++) {
    //   // console.log('service[i]', service[i]);
    //   const serviceObj = {};
    //   serviceObj.name = service[i].name;
    //   serviceObj.type = service[i].type;
    //   data.push(serviceObj);
    //   setData(data);
    // }
    // console.log('data in useEf2', data);
  })


  //initial data
  //HARD-CODED TO TEST
  const initData = {
    name: 'service-name',
    children: [
      {
        name: 'node-1',
        children: [
          { name: 'node1-pod1' },
          { name: 'node1-pod2' },
          { name: 'node1-pod3' },
          { name: 'node1-pod4' },
          { name: 'node1-pod5' },
        ],
      },
      {
        name: 'node-2',
        children: [
          { name: 'node2-pod1' },
          { name: 'node2-pod2' },
          { name: 'node2-pod3' },
          { name: 'node2-pod4' },
          { name: 'node2-pod5' },
          { name: 'node2-pod6' },
          { name: 'node2-pod7' },
        ],
      },
    ],
  };

  return (
    <div className='visContainer'>
      <h4>Pod Visualizer</h4>
      {/* <TreeChart data={initData} /> */}
      <RadialTree data={initData} />
    </div>
  );
};

export default Visualizer;
