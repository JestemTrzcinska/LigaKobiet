import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlayerInClub } from '../../../actions/playerInClub';

const CreatePlayerInClub = ({ createPlayerInClub }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    // current: '',
    club: '',
    player: '',
  });

  const [current, setCurrent] = useState(true);

  const { from, to, club, player } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, current, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    setCurrent(current);
    e.preventDefault();
    createPlayerInClub(formData);
  };

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Dodanie zawodniczki w klubie
          </p>
          <div className='form-group'>
            <small className='form-text'>*Zawodniczka:</small>
            <input
              type='text'
              placeholder='Zawodniczka'
              name='player'
              value={player}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>*Klub:</small>
            <input
              type='text'
              placeholder='Klub'
              name='club'
              value={club}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Od:</small>
            <input
              type='text'
              placeholder='Od'
              name='from'
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Obecnie:</small>
            <input
              type='checkbox'
              placeholder='Obecnie'
              name='current'
              value={current}
              onChange={(e) => onChange(e)}
            />
          </div>
          {!current && (
            <Fragment>
              <div className='form-group'>
                <small className='form-text'>Do:</small>
                <input
                  type='text'
                  placeholder='Do'
                  name='to'
                  value={to}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}
          <input type='submit' className='btn btn-primary' value='Potwierdź' />{' '}
          <Link className='btn btn-warning my-1 white' to='edit-data'>
            Wróć do danych
          </Link>
        </form>
      </Fragment>
    </div>
  );
};

CreatePlayerInClub.propTypes = {
  playerInClub: PropTypes.object.isRequired,
};

export default connect(null, { createPlayerInClub })(CreatePlayerInClub);
