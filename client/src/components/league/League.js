import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getLeagueById } from '../../actions/league';

const League = ({
  getLeagueById,
  league: { league, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getLeagueById(match.params.id);
  }, [getLeagueById]);
  return (
    <Fragment>
      {league === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/edit-data' className='btn btn-warning my-1 white'>
            Powrót do danych
          </Link>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user.isStaff ? (
            <Link to='/edit-league' className='btn btn-warning my-1 white'>
              Edytuj ligę
            </Link>
          ) : (
            ''
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

League.propTypes = {
  getLeagueById: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  league: state.league,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLeagueById })(League);
