import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGameById } from '../../actions/game';
import Moment from 'react-moment';

const Game = ({ getGameById, game: { game, loading }, auth, match }) => {
  useEffect(() => {
    getGameById(match.params.id);
  }, [getGameById]);
  return (
    <Fragment>
      {game === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='beginning'>
            <div className='large text-primary'>
              {game.teamHome.name} : {game.teamAway.name}
            </div>
            <p className=''>{game.league.name}</p>
            <Moment format='DD-MM-YYYY'>{game.date}</Moment>
            <p className=''>{game.localization}</p>

            <Link to='/edit-data' className='btn btn-warning my-1 white'>
              Powrót do danych
            </Link>
            {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.isStaff ? (
              <Link to='/edit-game' className='btn btn-warning my-1 white'>
                Edytuj mecz
              </Link>
            ) : null}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Game.propTypes = {
  getGameById: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
  auth: state.auth,
});

export default connect(mapStateToProps, { getGameById })(Game);
