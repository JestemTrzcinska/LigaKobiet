import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPlayerInClubById } from '../../actions/playerInClub';

const PlayerInClub = ({
  getPlayerInClubById,
  playerInClub: { playerInClub, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getPlayerInClubById(match.params.id);
  }, [getPlayerInClubById]);
  return (
    <Fragment>
      {playerInClub === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/edit-data' className='btn btn-warning my-1 white'>
            Powrót do danych
          </Link>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user.isStaff ? (
            <Link
              to='/edit-playerInClub'
              className='btn btn-warning my-1 white'
            >
              Edytuj zawodniczkę w klubie
            </Link>
          ) : (
            ''
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

PlayerInClub.propTypes = {
  getPlayerInClubById: PropTypes.func.isRequired,
  playerInClub: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  playerInClub: state.playerInClub,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPlayerInClubById })(PlayerInClub);
