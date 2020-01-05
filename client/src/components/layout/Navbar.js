import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';

const Navbar = () => {
  return (
    <nav className='navbar landing'>
      <div className='dark-overlay'>
        <Row className='navnav justify-content-md-center'>
          <Col className='btn-lg' xs lg='5'>
            <Link to='/stats' className='navnavnav'>
              Statystyki
            </Link>
            <Link to='/calendar'>Harmonogram</Link>
            <Link to='/news' className='navnavnav'>
              Aktualności
            </Link>
          </Col>
          <Col md='auto'>
            <h1>
              <Link to='/'>Liga Kobiet</Link>
            </h1>
          </Col>
          <Col xs lg='5'>
            <Button className='btn-danger'>
              <Link to='/loginregister'>Logowanie/Rejestracja</Link>
            </Button>
          </Col>
        </Row>
      </div>
    </nav>
  );
};

export default Navbar;
