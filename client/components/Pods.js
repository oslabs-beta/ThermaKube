// display details and data about each Pod
import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';


const Pods = () => {
  // using hooks to set state
  let [pod, setPod] = useState([]); //fetch pod data
  const [table, setTable] = useState([]); //pod data in table

  // useEffect = Hook version of componentDidMount
  useEffect(() => {
    const fetchPods = async () => {
      // axios request to server side
      const result = await axios.get('/getPods');
     
      pod = [];  //empty the pod before updating with fetched data
      setPod(pod.push(result.data));

      const podList = pod.map((p, i) => {
        return (
        <tbody key={`tbody${i}`}>
          <tr>
            <td>{p.name}</td>
            <td>{p.namespace}</td>
            <td>{p.status}</td>
            <td>{p.podIP}</td>
            <td>{p.createdAt}</td>
          </tr>
        </tbody>
        )
      });
      setTable(podList);
    };

    //update every 5 seconds
    setInterval(() => {fetchPods();}, 5000);
  }, []);


  return(
    <div className="podContainer">
      <h4 className="podsTitle">Pods List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pod Name</th>
            <th>Namespace</th>
            <th>Status</th>
            <th>Pod IP</th>
            <th>Created At</th>
          </tr>
        </thead>
        {table}
        </Table>
    </div>
  )
};

export default Pods;