// display details and data about each Pod
import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

const Pods = ({ data }) => {
  // using hooks to set state
  const [table, setTable] = useState([]); //pod data in table
  let children = [];
  data[0].children.map(child => children.push(...child.children));
  // console.log('children', children);
  // useEffect = Hook version of componentDidMount
  useEffect(() => {
    const podList = children.map((p, i) => {
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
        // if not "Running", invoke the addAlert func to add to database and render red circle
        addAlert(p);
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
  }, []);

  // function that adds a new Alert - gets called in ^useEffect when pod status is not "Running"
  const addAlert = async p => {
    const postAlert = await axios.post('/api/podAlerts', {
      name: p.name,
      namespace: p.namespace,
      status: p.status,
      podIP: p.podIP,
      time: Date(Date.now()).toString(),
    });
  };

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
