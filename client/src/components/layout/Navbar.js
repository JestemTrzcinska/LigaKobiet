import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <div className='toJestNav'>
          <ul className='navnav justify-content-md-center navbar-nav'>
            <li className='btn-lg nav-item' xs lg='5'>
              <Button className='nav-item active bordernone'>
                <Link to='/stats' className='navnavnav'>
                  Statystyki
                </Link>
              </Button>
              <Button className='nav-item active bordernone'>
                <Link to='/calendar'>Harmonogram</Link>
              </Button>
              <Button className='nav-item active bordernone'>
                <Link to='/news' className='navnavnav'>
                  Aktualności
                </Link>
              </Button>
            </li>
            <li md='auto' className='nav-item active hehe'>
              <h1>
                <Link to='/'>Liga Kobiet</Link>
              </h1>
            </li>
            <li xs lg='5'>
              <Button className='btn-danger nav-item active'>
                <Link to='/loginregister'>Logowanie/Rejestracja</Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// <div className='collapse navbar-collapse' id='navbarNav'>
// <div className='dark-overlay'>
//   <Row className='navnav justify-content-md-center navbar-nav'>
//     <Col className='btn-lg nav-item' xs lg='5'>
//       <Button className='nav-item'>
//         <Link to='/stats' className='navnavnav'>
//           Statystyki
//         </Link>
//       </Button>
//       <Button className='nav-item'>
//         <Link to='/calendar'>Harmonogram</Link>
//       </Button>
//       <Button className='nav-item'>
//         <Link to='/news' className='navnavnav'>
//           Aktualności
//         </Link>
//       </Button>
//     </Col>
//     <Col md='auto' className='nav-item'>
//       <h1>
//         <Link to='/'>Liga Kobiet</Link>
//       </h1>
//     </Col>
//     <Col xs lg='5'>
//       <Button className='btn-danger nav-item'>
//         <Link to='/loginregister'>Logowanie/Rejestracja</Link>
//       </Button>
//     </Col>
//   </Row>
// </div>
// </div>
