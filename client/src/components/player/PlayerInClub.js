import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPlayerInClubById } from '../../actions/playerInClub';
import Moment from 'react-moment';

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
          <div className='beginning'>
            <div className='large text-primary'>
              {playerInClub.player.firstName} {playerInClub.player.lastName}
            </div>
            <p>gra w {playerInClub.club.name}</p>
            od <Moment format='D MM YYYY'>{playerInClub.from}</Moment> do{' '}
            {playerInClub.current ? (
              'obecnie'
            ) : (
              <Moment format='D MM YYYY'>{playerInClub.to}</Moment>
            )}
            <p></p>
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
          </div>
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
