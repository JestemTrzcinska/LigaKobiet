import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createClub } from '../../../actions/club';

const CreateClub = ({ createClub }) => {
  const [formData, setFormData] = useState({
    name: '',
    league: '',
    logo: '',
  });

  const { name, league, logo } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createClub(formData);
  };

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Dodanie klubu
          </p>
          <div className='form-group'>
            <small className='form-text'>*Nazwa:</small>
            <input
              type='text'
              placeholder='Nazwa'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>*Liga:</small>
            <input
              type='text'
              placeholder='Liga'
              name='league'
              value={league}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Logo:</small>
            <input
              type='text'
              placeholder='Logo'
              name='logo'
              value={logo}
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

CreateClub.propTypes = {
  club: PropTypes.object.isRequired,
};

export default connect(null, { createClub })(CreateClub);
