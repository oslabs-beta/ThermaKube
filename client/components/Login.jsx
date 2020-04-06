import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import awsLogo from '../assets/awsLogo.png';
import axios from 'axios';
import aws4 from 'aws4';

// login page gives the option to authenticate AWS credentials or use current-context
const Login = () => {
  //hooks for AWS sign in
  const [access, setAccess] = useState({
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
  });
  const [auth, setAuth] = useState(false);
  const [clusters, setClusters] = useState([]);

  //function to authenticate credentials
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('accessInfo', access);
    // make a request to the aws api with credentials. if data is returned then redirect.
    const accessData = await axios.post('/aws/clusters', {
      access,
    });
    console.log('aD', accessData);
    if (accessData) {
      setClusters(accessData.data);
      setAuth(true);
    } else {
      console.log('none');
    }
  };

  const { accessKeyId, secretAccessKey, region } = access;

  return (
    <>
      {/* if authenticated, direct user to cluster page */}
      {auth ? (
        <Redirect to={{ pathname: '/eks', state: { data: clusters } }} />
      ) : null}
      <div className='loginPage'>
        <div className='loginContainer'>
          <img src={awsLogo} className='awsLogo' />
          <Form className='loginForm'>
            <Form.Group controlId='formAccessId' className='inputAccess'>
              <Form.Label>Access Key ID</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Access Key Id'
                value={accessKeyId}
                onChange={(e) =>
                  setAccess({ ...access, accessKeyId: e.target.value })
                }
              />
              <Form.Text className='text-muted'>
                {/* We'll never share your email with anyone else. */}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='formAccessKey' className='inputAccess'>
              <Form.Label>Secret Access Key</Form.Label>
              <Form.Control
                type='password'
                placeholder='Access Key'
                value={secretAccessKey}
                onChange={(e) =>
                  setAccess({ ...access, secretAccessKey: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId='formRegion' className='inputAccess'>
              <Form.Label>Region Code</Form.Label>
              <Form.Control
                as='select'
                value={region}
                onChange={(e) =>
                  setAccess({ ...access, region: e.target.value })
                }
              >
                <option>Choose...</option>
                <option>us-east-1</option>
                <option>us-east-2</option>
                <option>us-west-2</option>
                <option>ca-central-1</option>
                <option>ap-east-1</option>
                <option>ap-south-1</option>
                <option>ap-northeast-1</option>
                <option>ap-northeast-2</option>
                <option>ap-southeast-1</option>
                <option>ap-southeast-2</option>
                <option>cn-north-1</option>
                <option>cn-northwest-1</option>
                <option>eu-central-1</option>
                <option>eu-west-1</option>
                <option>eu-west-2</option>
                <option>eu-west-3</option>
                <option>eu-north-1</option>
                <option>me-south-1</option>
                <option>sa-east-1</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Button variant='primary' type='submit' onClick={handleSubmit}>
              Sign In with AWS
            </Button>
            <br />
            <h6>OR</h6>
            <br />
            <Link to='/cluster' className='contextLink'>
              Use Configured Current Context
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
