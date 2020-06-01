import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createClub, getClubById } from '../../../actions/club';

const EditClub = ({ club: { club, loading }, createClub, getClubById }) => {
  const [formData, setFormData] = useState({
    name: '',
    league: '',
    logo: '',
  });
  // goals

  useEffect(() => {
    getClubById();

    setFormData({
      name: loading || !club.name ? '' : club.name,
      league: loading || !club.league.name ? '' : club.league.name,
      logo: loading || !club.logo ? '' : club.logo,
    });
  }, [loading, getClubById]);

  const { name, league, logo } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createClub(formData, true);
  };

  const linkTo = `/club/${club._id}`;

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Edycja klubu
          </p>
          <div className='form-group'>
            <small className='form-text'>Nazwa:</small>
            <input
              type='text'
              placeholder='Nazwa'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Liga:</small>
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
          <Link className='btn btn-warning my-1 white' to={linkTo}>
            Wróć
          </Link>
        </form>
      </Fragment>
    </div>
  );
};

EditClub.propTypes = {
  createClub: PropTypes.func.isRequired,
  getClubById: PropTypes.func.isRequired,
  club: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  club: state.club,
});

export default connect(mapStateToProps, { createClub, getClubById })(EditClub);
