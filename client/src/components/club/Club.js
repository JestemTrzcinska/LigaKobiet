import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getClubById } from '../../actions/club';

const Club = ({ getClubById, club: { club, loading }, auth, match }) => {
  useEffect(() => {
    getClubById(match.params.id);
  }, [getClubById]);
  return (
    <Fragment>
      {club === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/edit-data' className='btn btn-warning my-1 white'>
            Powrót do danych
          </Link>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user.isStaff ? (
            <Link to='/edit-club' className='btn btn-warning my-1 white'>
              Edytuj klub
            </Link>
          ) : (
            ''
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Club.propTypes = {
  getClubById: PropTypes.func.isRequired,
  club: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  club: state.club,
  auth: state.auth,
});

export default connect(mapStateToProps, { getClubById })(Club);
