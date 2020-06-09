import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <li xs lg='5'>
      <Button className='nav-item active bordernone'>
        <Link to='/dashboard'>
          Mój profil <i className='fa fa-user' />
        </Link>
      </Button>
      <Button className='btn-warning nav-item active'>
        <Link onClick={logout} to='/#!'>
          Wyloguj się
        </Link>
      </Button>
    </li>
  );

  const guestLinks = (
    <li xs lg='5'>
      <Button className='btn-danger nav-item active'>
        <Link to='/loginregister'>Logowanie/Rejestracja</Link>
      </Button>
      {/* Jeżeli chcę schować napis na urządzeniach i zostawić tylko emotkę to:
      <Button><Link><span className="hide-sm">Logowanie/Rejestracja</span></Link></Button>
      */}
    </li>
  );

  const staffLinks = (
    <li xs lg='5'>
      <Button className='btn-danger nav-item active'>
        <Link to='/edit-data'>Edytuj dane</Link>
      </Button>
    </li>
  );

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
            {!loading && (
              <Fragment>
                {isAuthenticated && user && user.isStaff ? (
                  <Fragment>{staffLinks}</Fragment>
                ) : null}
              </Fragment>
            )}
            <li className='btn-lg nav-item' xs lg='5'>
              <Button className='nav-item active bordernone'>
                <Link to='/stats' className='navnavnav'>
                  Statystyki
                </Link>
              </Button>
              <Button className='nav-item active bordernone'>
                <Link to='/schedule'>Harmonogram</Link>
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

            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
            {/* { !loading ? '' : null } jeżeli nie to '' else null, to samo jest wyżej*/}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

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
