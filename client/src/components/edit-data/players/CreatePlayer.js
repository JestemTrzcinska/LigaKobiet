import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlayer } from '../../../actions/player';
// import Moment from 'react-moment'

const CreatePlayer = ({ createPlayer }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    avatar: '',
    birth: '',
  });

  const { firstName, lastName, name, avatar, birth } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createPlayer(formData);
  };

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Dodaj zawodniczkę
          </p>
          <div className='form-group'>
            <small className='form-text'>*Imię:</small>
            <input
              type='text'
              placeholder='Imię'
              name='firstName'
              value={firstName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>*Nazwisko:</small>
            <input
              type='text'
              placeholder='Nazwisko'
              name='lastName'
              value={lastName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Pseudonim:</small>
            <input
              type='text'
              placeholder='Pseudonim'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Zdjęcie:</small>
            <input
              type='text'
              placeholder='Zdjęcie'
              name='avatar'
              value={avatar}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Data urodzenia:</small>
            <input
              type='text'
              placeholder='Data urodzenia'
              name='birth'
              value={birth}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Potwierdź' />{' '}
          <Link className='btn btn-warning my-1 white' to='edit-data'>
            Wróć do danych
          </Link>
        </form>
      </Fragment>
    </div>
  );
};

CreatePlayer.propTypes = {
  createPlayer: PropTypes.func.isRequired,
};

export default connect(null, { createPlayer })(CreatePlayer);
