import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import awsLogo from '../assets/awsLogo.png';

// login page gives the option to authenticate AWS credentials or use current-context
const Login = () => {
  //hooks for AWS sign in
  // const [accessID, setAccessID] = useState('');
  // const [accessKey, setAccessKey] = useState('');
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
          <form className='loginForm' onSubmit={handleSubmit}>
            <label className='inputName'>
              Access Key ID
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type='text'
                className='awsInput'
                value={accessKeyId}
                onChange={(e) =>
                  setAccess({ ...access, accessKeyId: e.target.value })
                }
              />
            </label>
            <br />
            <label className='inputName'>
              Secret Access Key &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type='password'
                className='awsInput'
                value={secretAccessKey}
                onChange={(e) =>
                  setAccess({ ...access, secretAccessKey: e.target.value })
                }
              />
            </label>
            <br />
            <button className='awsInput'>Sign In with AWS</button>
          </form>
          <h6>OR</h6>
          <br />
          <Link to='/cluster' className='contextLink'>
            Use Configured Current Context
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
