import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import awsLogo from '../assets/awsLogo.png';

// login page gives the option to authenticate AWS credentials or use current-context
const Login = () => {
  //hooks for AWS sign in
  const [access, setAccess] = useState({
    accessKeyId: '',
    secretAccessKey: '',
  });
  const [auth, setAuth] = useState(false);

  //function to authenticate credentials
  const handleSubmit = () => {
    console.log('accessInfo', access);
    setAuth(true);
  };
  const { accessKeyId, secretAccessKey } = access;

  return (
    <>
      {/* if authenticated, direct user to cluster page */}
      {auth ? <Redirect to='/cluster' /> : null}
      <div className='loginPage'>
        <div className='loginContainer'>
          <img src={awsLogo} className='awsLogo' />
          <Form className='loginForm' onSubmit={handleSubmit}>
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
            <br />
            <Button variant='primary' type='submit'>
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
