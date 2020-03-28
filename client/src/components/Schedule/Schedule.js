import React from 'react';
import { Col } from 'react-bootstrap';
import Calendar from './Calendar';
import Legend from './Legend';

const Schedule = () => {
  return (
    <div className='logowanie1'>
      <div className='logowanie2'>
        <div className='logowanie3'>
          <Col>
            <Calendar />
          </Col>
          <Col className='topp'>
            <Legend />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
