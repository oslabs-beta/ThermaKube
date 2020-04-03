import React from 'react';
import { Link } from 'react-router-dom';
import awsLogo from '../assets/awsLogo.png';
// login page gives the option to authenticate AWS credentials or use current-context
const Login = () => {
  return (
    <div className='loginPage'>
      <div className='loginContainer'>
        {/* <h4 className='loginTitle'>Login</h4> */}
        <img src={awsLogo} className='awsLogo' />
        <form className='loginForm'>
          {/* <h5>Login with AWS</h5> */}
          <label className='inputName'>
            Access Key ID
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type='text' />
          </label>
          <br />
          <label className='inputName'>
            Secret Access Key &nbsp;&nbsp;&nbsp;&nbsp;
            <input type='text' />
          </label>
          <br />
          <button>Sign In with AWS</button>
        </form>
        <h6>OR</h6>
        <br />
        <Link to='/cluster' className='contextLink'>
          Use Configured Current Context
        </Link>
      </div>
    </div>
  );
};

export default Login;
