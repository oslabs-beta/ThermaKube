//crash logs, errors, CPU/memory usage exceeded
/* 
The Status field should be "Running" - any other status will indicate issues with the environment.
- fetch podlist and check statuses, if not running, create a log
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Alerts = () => {
  let [alerts, setAlerts] = useState([]);
  const [table, setTable] = useState([]); //alert data in table

  // useEffect = Hook version of componentDidMount
  useEffect(() => {
    const fetchPods = async () => {
      // axios request to server side
      const result = await axios.get('/getPods');

      alerts = []; //empty the alerts before updating with fetched data
      setAlerts(alerts.push(result.data));
      console.log('alerts', alerts);

      const alertList = alerts.map((p, i) => {
        //iterate through each pod and check status ** Date feature is coming out weird
        if (p.status !== 'Running') {
          return (
            <tbody key={`tbody${i}`}>
              <tr>
                <td>{p.name}</td>
                <td>{p.namespace}</td>
                <td>{p.status}</td>
                <td>{p.podIP}</td>
                <td>{Date.now()}</td>
              </tr>
            </tbody>
          );
        }
      });
      setTable(alertList);
    };

    //update every 5 seconds
    setInterval(() => {
      fetchPods();
    }, 5000);
  }, []);

  return (
    <div className='alertsContainer'>
      <h4 className='alerts'>Alerts</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pod Name</th>
            <th>Namespace</th>
            <th>Status</th>
            <th>Pod IP</th>
            <th>Time</th>
          </tr>
        </thead>
        {table}
      </Table>
    </div>
  );
};

export default Alerts;
