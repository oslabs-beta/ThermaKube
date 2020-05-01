//crash logs, errors, CPU/memory usage exceeded
/* 
The Status field should be "Running" - any other status will indicate issues with the environment.
- fetch podlist and check statuses, if not running, create a log
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import Cookies from 'js-cookie';

const Alerts = () => {
  let [alerts, setAlerts] = useState([]);
  const [table, setTable] = useState([]); //alert data in table
  // useEffect = Hook version of componentDidMount
  useEffect(() => {
    console.log('cookies', Cookies.get('token'));
    const token = Cookies.get('token');
    const header = {
      headers: {
        Authorization: 'Bearer' + token,
      },
    };
    const fetchPods = async () => {
      // axios request to server side
      const result = await axios.get('/api/alerts', header);
      if (result.data) {
        alerts = []; //empty the alerts before updating with fetched data
        setAlerts(alerts.push(result.data));
      } else {
        alerts = [[]];
      }
      console.log('alerts', alerts);
      const alertList = alerts[0].map((p, i) => {
        return (
          <tbody key={`tbody${i}`}>
            <tr>
              <td>{p.name}</td>
              <td>{p.namespace}</td>
              <td>
                <FontAwesomeIcon icon={faMinusCircle} color='orange' />
                &nbsp;&nbsp;{p.status}
              </td>
              <td>{p.podIP}</td>
              <td>{p.time}</td>
            </tr>
          </tbody>
        );
      });
      setTable(alertList);
    };

    //update every 5 seconds
    const fetchOnLoad = () => {
      if (!alerts[0]) {
        console.log('First fetch called');
        fetchPods();
      }
      setInterval(() => {
        console.log('setInterval called');
        fetchPods();
      }, 5000);
    };
    fetchOnLoad();
  }, []);

  return (
    <div className='alertsContainer'>
      {table[0] && (
        <div>
          <h4 className='alertsTitle'>Alerts</h4>
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
      )}
    </div>
  );
};

export default Alerts;
