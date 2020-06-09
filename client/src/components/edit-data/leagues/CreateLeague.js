import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLeague } from '../../../actions/league';
// import Moment from 'react-moment'

const CreateLeague = ({ createLeague }) => {
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
  });

  const { name, from, to } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createLeague(formData);
  };

  return (
    <div className='beginning'>
      <div className='darker-bg'>
        <Fragment>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <p className='lead'>
              <i className='fas fa-user'></i> Dodanie ligi
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
              <small className='form-text'>*Od:</small>
              <input
                type='text'
                placeholder='RRRR-MM-DD'
                name='from'
                value={from}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <small className='form-text'>*Do:</small>
              <input
                type='text'
                placeholder='RRRR-MM-DD'
                name='to'
                value={to}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input
              type='submit'
              className='btn btn-primary'
              value='Potwierdź'
            />{' '}
            <Link className='btn btn-warning my-1 white' to='edit-data'>
              Wróć do danych
            </Link>
          </form>
        </Fragment>
      </div>
    </div>
  );
};

CreateLeague.propTypes = {
  createLeague: PropTypes.func.isRequired,
};

export default connect(null, { createLeague })(CreateLeague);
