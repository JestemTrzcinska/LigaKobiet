import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createPlayerInClub,
  getPlayerInClubById,
} from '../../../actions/playerInClub';

const EditPlayerInClub = ({
  playerInClub: { playerInClub, loading },
  createPlayerInClub,
  getPlayerInClubById,
}) => {
  const [formData, setFormData] = useState({
    from: '',
    club: '',
    player: '',
    current: '',
    to: '',
  });

  const [current, setCurrent] = useState(playerInClub.current);

  useEffect(() => {
    getPlayerInClubById(playerInClub._id);

    setFormData({
      from: loading || !playerInClub.from ? '' : playerInClub.from,
      to: loading || !playerInClub.to ? '' : playerInClub.to,
      club: loading || !playerInClub.club ? '' : playerInClub.club.name,
      player:
        loading || !playerInClub.player
          ? ''
          : playerInClub.player.firstName +
            ' ' +
            playerInClub.player.lastName +
            ' ' +
            playerInClub.player.name,
      current: loading || !playerInClub.current ? false : playerInClub.current,
    });
  }, [loading, getPlayerInClubById]);

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
    console.log(formData);
    e.preventDefault();
    createPlayerInClub(formData, true);
  };

  const linkTo = `/playerInClub/${playerInClub._id}`;

  return (
    <div className='beginning'>
      <div className='darker-bg'>
        <Fragment>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <p className='lead'>
              <i className='fas fa-user'></i> Edycja zawodniczki w klubie
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
            <Link className='btn btn-warning my-1 white' to={linkTo}>
              Wróć
            </Link>
          </form>
        </Fragment>
      </div>
    </div>
  );
};

EditPlayerInClub.propTypes = {
  createPlayerInClub: PropTypes.func.isRequired,
  getPlayerInClubById: PropTypes.func.isRequired,
  playerInClub: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  playerInClub: state.playerInClub,
});

export default connect(mapStateToProps, {
  createPlayerInClub,
  getPlayerInClubById,
})(EditPlayerInClub);
