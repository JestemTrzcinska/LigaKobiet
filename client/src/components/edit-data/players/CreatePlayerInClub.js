import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlayerInClub } from '../../../actions/playerInClub';

const CreatePlayerInClub = ({ createPlayerInClub }) => {
  const [formData, setFormData] = useState({
    from: '',
    club: '',
    player: '',
    current: true,
    to: '',
  });

  const [current, setCurrent] = useState(true);

  const { from, club, player, to } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCurrent = (e) => {
    setCurrent(e.target.checked);
    setFormData({ ...formData, current: e.target.checked });
  };

  const onSubmit = (e) => {
    if (formData.current === true) {
      formData.to = '';
    }
    e.preventDefault();
    createPlayerInClub(formData);
  };

  return (
    <div className='beginning'>
      <div className='darker-bg'>
        <Fragment>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <p className='lead'>
              <i className='fas fa-user'></i> Dodanie zawodniczki w klubie
            </p>
            <div className='form-group'>
              <small className='form-text'>
                *Imię nazwisko pseudonim - zawodniczki:
              </small>
              <input
                type='text'
                placeholder='Zawodniczka'
                name='player'
                value={player}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <small className='form-text'>*Nazwa klubu:</small>
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
                placeholder='RRRR-MM-DD'
                name='from'
                value={from}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <small className='form-text'>Obecnie:</small>
              <input
                defaultChecked={current}
                type='checkbox'
                placeholder='Obecnie'
                name='current'
                value={current}
                onChange={(e) => addCurrent(e)}
              />
            </div>
            {!current && (
              <Fragment>
                <div className='form-group'>
                  <small className='form-text'>Do:</small>
                  <input
                    type='text'
                    placeholder='RRRR-MM-DD'
                    name='to'
                    value={to}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </Fragment>
            )}
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

CreatePlayerInClub.propTypes = {
  createPlayerInClub: PropTypes.func.isRequired,
};

export default connect(null, {
  createPlayerInClub,
})(CreatePlayerInClub);
