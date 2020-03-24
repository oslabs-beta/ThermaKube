import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Services = () => {

  let [service, setService] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const result = await axios.get('/getServices');
      service = [];
      setService(service.push(result.data));

      const serviceList = service.map((data, index) => {
        return (
          <tbody key={`tbody${index}`}>
          <tr>
            <td>{data.name}</td>
            <td>{data.type}</td>
            <td>{data.namespace}</td>
            <td>{data.port}</td>
            <td>{data.clusterIP}</td>
          </tr>
        </tbody>
        )
      });
      setTable(serviceList);
    }
    const fetchOnLoad = () => {
      if (!service[0]) {
        console.log('First fetch called');
        fetchServices();
      }
      setInterval(() => {
        console.log('setInterval called');
        fetchServices();
      }, 5000);
    };
    fetchOnLoad();
  }, []);


  return(
    <div className="serviceContainer">
      <h4 className="serviceTitle">Services List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Type</th>
            <th>Namespace</th>
            <th>Port</th>
            <th>Cluster IP</th>
          </tr>
        </thead>
        {table}
        </Table>
    </div>
  )
}

export default Services;