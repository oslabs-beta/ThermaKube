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
      setNode(node.push(result.data));

      const nodeList = node.map((data, index) => {
        return (
          <tbody key={`tbody${index}`}>
          <tr>
            <td>{data.name}</td>
            <td>{data.cpu}</td>
          </tr>
        </tbody>
        )
      });
      setTable(nodeList);
    }
    setInterval(() => {fetchNodes();}, 5000);
  }, []);


  return(
    <div className="nodeContainer">
      <h4 className="nodeTitle">Nodes List</h4>
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
  )
}

export default Nodes;