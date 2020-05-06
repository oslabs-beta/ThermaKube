import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import awsLogo from '../assets/awsLogo.png';
import axios from 'axios';
import Cookies from 'js-cookie';

/**
 *
 *  LOGIN WITH AWS AUTH UNDER CONSTRUCTION
 *
 */
const Login = ({ isAuthed }) => {
  //hooks for AWS sign in
  const [access, setAccess] = useState({
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
  });
  const [auth, setAuth] = useState(false);
  const [verify, setVerify] = useState(false);
  const [clusters, setClusters] = useState([]);

  //hooks for user sign up
  const [signup, setSignup] = useState({
    newEmail: '',
    newPassword: '',
  });

  //hooks for user login
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  //function to authenticate credentials
  const handleAwsSignin = async event => {
    event.preventDefault();
    // console.log('accessInfo', access);
    // make a request to the aws api with credentials. if data is returned then redirect.
    const accessData = await axios.post('/aws/clusters', {
      access,
    });
    // console.log('aD', accessData);
    if (accessData) {
      setClusters(accessData.data);
      setAuth(true);
    } else {
      // console.log('none');
    }
  };
  //function to sign up new users
  const handleSignup = async event => {
    event.preventDefault();
    const signupSuccess = await axios.post('/login/signup', {
      signup,
    });
    // console.log('signup success', signupSuccess);
    if (signupSuccess) {
      Cookies.set('token', signupSuccess.data);
      setVerify(true);
      isAuthed();
    }
  };
  //function to login/verify existing users
  const handleLogin = async event => {
    event.preventDefault();
    const loginSuccess = await axios.post('/login/verify', {
      login,
    });
    // console.log('login success', loginSuccess);
    if (loginSuccess.data) {
      Cookies.set('token', loginSuccess.data);
      setVerify(true);
      isAuthed();
    } else {
      // console.log('user not verified');
    }
  };

  const { accessKeyId, secretAccessKey, region } = access;
  const { newEmail, newPassword } = signup;
  const { email, password } = login;

  return (
    <>
      {/* if authenticated, direct user to cluster page */}
      {auth ? (
        <Redirect
          to={{
            pathname: '/eks',
            state: { data: clusters, credentials: access },
          }}
        />
      ) : null}
      {verify ? (
        <Redirect
          to={{
            pathname: '/cluster',
          }}
        />
      ) : null}
      <div className='loginPage'>
        <div className='loginContainer'>
          <img src={awsLogo} className='awsLogo' />
          <h4 className='comingSoon'>Sign in with AWS coming soon!</h4>
          {/* <Form className='loginForm'>
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
            <Button variant='primary' type='submit' onClick={handleAwsSignin}>
              Sign In with AWS
            </Button>
            <br />
          </Form> */}
        </div>

        {/* user sign up w/o aws */}

        <div className='loginContainer'>
          <h5 className='signupTitle'>
            Sign up to monitor your <br />
            Kubernetes cluster.
          </h5>
          <Form className='loginForm'>
            <Form.Group controlId='formEmail' className='inputAccess'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                value={newEmail}
                onChange={e =>
                  setSignup({ ...signup, newEmail: e.target.value })
                }
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='formPassword' className='inputAccess'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={newPassword}
                onChange={e =>
                  setSignup({ ...signup, newPassword: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Button variant='primary' type='submit' onClick={handleSignup}>
              Sign Up
            </Button>
          </Form>

          {/* user sign up w/o aws */}
          <h6 className='haveAccount'>Already have an account?</h6>

          <Form className='loginForm'>
            <Form.Group controlId='verifyEmail' className='inputAccess'>
              <Form.Control
                type='text'
                placeholder='Email'
                value={email}
                onChange={e => setLogin({ ...login, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId='verifyPassword' className='inputAccess'>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setLogin({ ...login, password: e.target.value })}
              />
            </Form.Group>
            <br />
            <Button variant='primary' type='submit' onClick={handleLogin}>
              Sign In
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
