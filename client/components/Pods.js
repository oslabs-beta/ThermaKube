// display details and data about each Pod
import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

const Pods = () => {
  // using hooks to set state
  let [pod, setPod] = useState([]); //fetch pod data
  const [table, setTable] = useState([]); //pod data in table

  // useEffect = Hook version of componentDidMount
  useEffect(() => {
    const fetchPods = async () => {
      // axios request to server side
      const result = await axios.get('/getPods');

      pod = []; //empty the pod before updating with fetched data
      setPod(pod.push(result.data));
      console.log('pods', pod);

      const podList = pod[0].map((p, i) => {
        // check status - if "Running" then render green check circle
        if (p.status === 'Running') {
          return (
            <tbody key={`tbody${i}`}>
              <tr>
                <td>{p.name}</td>
                <td>{p.namespace}</td>
                <td>
                  <FontAwesomeIcon icon={faCheckCircle} color='#00df00' />
                  &nbsp;&nbsp;
                  {p.status}
                </td>
                <td>{p.podIP}</td>
                <td>{p.createdAt}</td>
              </tr>
            </tbody>
          );
        } else {
          // if not "Running", render red circle
          return (
            <tbody key={`tbody${i}`}>
              <tr>
                <td>{p.name}</td>
                <td>{p.namespace}</td>
                <td>
                  <FontAwesomeIcon icon={faMinusCircle} color='red' />
                  &nbsp;&nbsp;
                  {p.status}
                </td>
                <td>{p.podIP}</td>
                <td>{p.createdAt}</td>
              </tr>
            </tbody>
          );
        }
      });
      setTable(podList);
    };
    //call initial fetchPods and then update every 5 seconds
    const fetchOnLoad = () => {
      if (!pod[0]) {
        console.log('First fetch called');
        fetchPods();
      }
      setInterval(() => {
        console.log('setInterval called');
        fetchPods();
      }, 2000);
    };
    fetchOnLoad();
  }, []);

  return (
    <div className='podContainer'>
      <h4 className='podsTitle'>Pods List</h4>
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
  );
};

export default Pods;
