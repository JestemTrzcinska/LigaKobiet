import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    favClub: '',
    contact: '',
    localization: '',
    about: '',
  });

  const { favClub, contact, localization, about } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Uzupełnij swój profil
          </p>
          <div className='form-group'>
            <small className='form-text'>Twój ulubiony klub:</small>
            <input
              type='text'
              placeholder='Twój ulubiony klub'
              name='favClub'
              value={favClub}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Miejsce zamieszkania:</small>
            <input
              type='text'
              placeholder='Miejsce zamieszkania'
              name='localization'
              value={localization}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Powiedz coś o sobie:</small>
            <input
              type='text'
              placeholder='Powiedz coś o sobie'
              name='about'
              value={about}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Kontakt do Ciebie:</small>
            <input
              type='text'
              placeholder='Kontakt do Ciebie'
              name='contact'
              value={contact}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Potwierdź' />{' '}
          <Link className='btn btn-warning my-1 white' to='/dashboard'>
            Wróć
          </Link>
        </form>
      </Fragment>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile)); // with to history
