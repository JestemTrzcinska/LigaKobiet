import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <h2 className='x-large'>Liga Kobiet</h2>
        <div className='landing-inner'>
          <div className='cards'>
            <div className='cards card-first'>
              <Link to='/stats'>Statystyki</Link>
            </div>

            <div className='cards card-sec'>
              <Link to='/calendar'>Harmonogram</Link>
            </div>

            <div className='cards card-third'>
              <Link to='/news'>Aktualności</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

/* <section className='landing'>
<div className='dark-overlay'>
  <h2 className='x-large'>Liga Kobiet</h2>
  <Row className='landing-inner'>
    <Col className='card card-first'>
      <Link to='/stats'>Statystyki</Link>
    </Col>
    <Col className='card card-sec'>
      <Link to='/calendar'>Harmonogram</Link>
    </Col>
    <Col className='card card-third'>
      <Link to='/news'>Aktualności</Link>
    </Col>
  </Row>
</div>
</section> */
