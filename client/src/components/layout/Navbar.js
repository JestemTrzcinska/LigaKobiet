import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> Liga Kobiet
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        <li>
          <Link to='/register'>Rejestracja</Link>
        </li>
        <li>
          <Link to='/login'>Logowanie</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
