import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame, getGameById } from '../../../actions/game';
// import Moment from 'react-moment'

const EditGame = ({ game: { game, loading }, createGame, getGameById }) => {
  const [formData, setFormData] = useState({
    teamHome: '',
    teamAway: '',
    league: '',
    localization: '',
    date: '',
  });
  // goals

  useEffect(() => {
    getGameById();

    setFormData({
      teamHome: loading || !game.teamHome.name ? '' : game.teamHome.name,
      teamAway: loading || !game.teamAway.name ? '' : game.teamAway.name,
      league: loading || !game.league.name ? '' : game.league.name,
      localization: loading || !game.localization ? '' : game.localization,
      date: loading || !game.date ? '' : game.date,
    });
  }, [loading, getGameById]);

  const { teamHome, teamAway, league, localization, date } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createGame(formData, true);
  };

  const linkTo = `/game/${game._id}`;

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Edycja meczu
          </p>
          <div className='form-group'>
            <small className='form-text'>Gospodarz:</small>
            <input
              type='text'
              placeholder='Gospodarz'
              name='teamHome'
              value={teamHome}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Gość:</small>
            <input
              type='text'
              placeholder='Gość'
              name='teamAway'
              value={teamAway}
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
            <small className='form-text'>Miejsce spotkania:</small>
            <input
              type='text'
              placeholder='Miejsce spotkania'
              name='localization'
              value={localization}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Data spotkania:</small>
            <input
              type='text'
              placeholder='Data spotkania'
              name='date'
              value={date}
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

EditGame.propTypes = {
  createGame: PropTypes.func.isRequired,
  getGameById: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { createGame, getGameById })(EditGame); // with to history
