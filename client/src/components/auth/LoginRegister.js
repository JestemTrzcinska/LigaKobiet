import React from 'react';
import { Col } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
  return (
    <div className='logowanie1'>
      <div className='logowanie2'>
        <div className='logowanie3'>
          <Col>
            <Login />
          </Col>
          <Col className='topp'>
            <Register />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
