import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPlayerById } from '../../actions/player';

const Player = ({
  getPlayerById,
  player: { player, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getPlayerById(match.params.id);
  }, [getPlayerById]);
  return (
    <Fragment>
      {player === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='beginning'>
            <div className='large text-primary'>
              <img src={player.avatar} alt='' className='img' />
              {'  '}
              {player.firstName} {player.lastName}
            </div>
            {player.name}
            <p>
              {player.birth ? (
                <p className=''>Urodzona: {player.birth}</p>
              ) : null}
            </p>

            <Link to='/edit-data' className='btn btn-warning my-1 white'>
              Powrót do danych
            </Link>
            {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.isStaff ? (
              <Link to='/edit-player' className='btn btn-warning my-1 white'>
                Edytuj zawodniczkę
              </Link>
            ) : (
              ''
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Player.propTypes = {
  getPlayerById: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPlayerById })(Player);
