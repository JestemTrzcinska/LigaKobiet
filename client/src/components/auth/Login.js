import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
  };
  return (
    <Fragment>
      {/* <div className='alert alert-danger'>Nieprawidłowe dane</div> */}
      <p className='lead'>
        <i className='fas fa-user'></i> Zaloguj się na swoje konto
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Hasło'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Potwierdź' />
      </form>
      <p className='my-1'>
        Nie masz jeszcze konta? <Link to='/register'>Zarejestruj się</Link>
      </p>
    </Fragment>
  );
};

export default Login;
