import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Games from './games/Games';
import Clubs from './clubs/Clubs';
import Leagues from './leagues/Leagues';
import Players from './players/Players';
import PlayersInClub from './players/PlayersInClub';
// import Register from './Register';

const EditData = () => {
  return (
    <div className='logowanie1'>
      <div className='logowanie2'>
        <div className='edit-data'>
          <Row>
            <Games />
            <Col>
              <Clubs />
            </Col>
            <Col>
              <Leagues />
            </Col>
            <Col>
              <Players />
            </Col>
            <Col>
              <PlayersInClub />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default EditData;
