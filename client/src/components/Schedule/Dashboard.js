import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='beginning'>
      <Fragment>
        <h1 className='large text-primary'> Profil</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Witam Cię{' '}
          {user && user.firstName + ' ' + user.lastName}
        </p>
        {profile !== null ? (
          <Fragment>has</Fragment>
        ) : (
          <Fragment>
            <p>
              Nie masz uzupełnionyh informacji o sobie. Dodaj je, aby móc
              zdobywać punkty!
            </p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Uzupełnij tutaj
            </Link>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
