import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Nodes = () => {
  let [node, setNode] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    const fetchNodes = async () => {
      const result = await axios.get('/getNodes');
      node = [];
      // console.log('node', result.data);
      setNode(node.push(result.data));
      // console.log('newNode', node);
      const nodeList = node[0].map((data, index) => {
        return (
          <tbody key={`tbody${index}`}>
            <tr>
              <td>{data.name}</td>
              <td>{data.cpu}</td>
            </tr>
          </tbody>
        );
      });
      setTable(nodeList);
    };
    const fetchOnLoad = () => {
      if (!node[0]) {
        console.log('First fetch called');
        fetchNodes();
      }
      setInterval(() => {
        console.log('setInterval called');
        fetchNodes();
      }, 5000);
    };
    fetchOnLoad();
  }, []);

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
        {table}
      </Table>
    </div>
  );
};

export default Nodes;
