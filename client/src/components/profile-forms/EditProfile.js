import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    favClub: '',
    contact: '',
    localization: '',
    about: '',
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      favClub: loading || !profile.favClub.name ? '' : profile.favClub.name,
      contact: loading || !profile.contact ? '' : profile.contact,
      localization:
        loading || !profile.localization ? '' : profile.localization,
      about: loading || !profile.about ? '' : profile.about,
    });
  }, [loading]);

  const { favClub, contact, localization, about } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Edytuj swój profil
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
); // with to history
