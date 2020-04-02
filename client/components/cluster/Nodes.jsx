import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Nodes = ({ data }) => {
  const nodeList = data[0].children.map((data, index) => {
    return (
      <tbody key={`tbody${index}`}>
        <tr>
          <td>{data.name}</td>
          <td>{data.cpu}</td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className='nodeContainer'>
      <h4 className='nodeTitle'>Nodes List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Node Name</th>
            <th>CPU</th>
          </tr>
        </thead>
        {nodeList}
      </Table>
    </div>
  );
};

export default Nodes;
