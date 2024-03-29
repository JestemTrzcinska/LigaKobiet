import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Hasła nie są takie same', 'danger');
    } else {
      register({ firstName, lastName, email, password });
    }
  };

  // Redirect if registered
  if (isAuthenticated) {
    return <Redirect to='/schedule' />;
  }

  return (
    <Fragment>
      <p className='lead redred'>
        <i className='fas fa-user'></i>Stwórz swoje konto
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Imię'
            name='firstName'
            value={firstName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nazwisko'
            name='lastName'
            value={lastName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Hasło'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Potwierdź hasło'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Potwierdź' />
      </form>
      {/* <p className='my-1'>
        Posiadasz już konto? <Link to='/login'>Zaloguj się</Link>
      </p> */}
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

//else axios needed
//   const newUser = {
//     firstName,
//     lastName,
//     email,
//     password,
//     password2
//   };
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };
//     const body = JSON.stringify(newUser);
//     const res = await axios.post('/api/users', body, config);
//     console.log(res.data);
//   } catch (err) {
//     console.log(err.response.date);
//   }
