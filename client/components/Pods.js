// display details and data about each Pod
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';


const Pods = () => {
  // using hooks to set state
  const [pod, setPod] = useState([]); //fetch pod data
  const [table, setTable] = useState([]); //pod data in table

  // useEffect = Hook version of componentDidMount
  // fetch pod data
  useEffect(() => {
    const fetchPods = async () => {
      // axios request to server side
      const result = await axios.get('/getPods');
      setPod(pod.push(result.data));
      console.log('pod', pod);

      const podList = pod.map((p, i) => {
        //return <p key={`pod${i}`}>{p.name} {p.namespace} {p.status} {p.podIP} {p.createdAt}</p>;
        return (
        <tbody>
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

    fetchPods();
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