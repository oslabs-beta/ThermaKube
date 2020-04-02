import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Services = ({ data }) => {
  const [table, setTable] = useState([]);

  useEffect(() => {
    const serviceList = data.map((data, index) => {
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
      );
    });
    setTable(serviceList);
  }, []);

  return (
    <div className='serviceContainer'>
      <h4 className='serviceTitle'>Services List</h4>
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
  );
};

export default Services;
