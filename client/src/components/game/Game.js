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

  let sumTeamHome = 0;
  let sumTeamAway = 0;

  return (
    <Fragment>
      {game === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {game.goals.length > 0
            ? game.goals.map((item) => {
                if (!item.goalForTeamHome) {
                  sumTeamAway = sumTeamAway + item.amount;
                }
              })
            : null}
          {game.goals.length > 0
            ? game.goals.map((item) => {
                if (item.goalForTeamHome) {
                  sumTeamHome = sumTeamHome + item.amount;
                }
              })
            : null}
          <div className='beginning'>
            <div className='large text-primary'>
              {game.teamHome.name} {sumTeamHome} : {sumTeamAway}{' '}
              {game.teamAway.name}
            </div>
            <p className=''>{game.league.name}</p>
            <p>
              Data: <Moment format='D MM YYYY HH:mm'>{game.date}</Moment>
            </p>
            <p className=''>Lokalizacja: {game.localization}</p>
            <p>Spotkanie w {game.league.name}</p>

            {game.goals.length > 0
              ? game.goals.map((item) => (
                  <div>
                    {item.shotBy.firstName} {item.shotBy.lastName} strzeliła{' '}
                    {item.amount}{' '}
                    {item.amount === 1
                      ? 'bramkę'
                      : item.amount === 2 || item.amount === 4
                      ? 'bramki'
                      : 'bramek'}{' '}
                    {item.amount == 1
                      ? item.isOwn
                        ? 'samobójczą'
                        : ''
                      : item.isOwn
                      ? 'samobójcze'
                      : ''}
                  </div>
                ))
              : null}

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
