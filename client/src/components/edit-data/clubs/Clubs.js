import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getClubs } from '../../../actions/club';
import ClubItem from './ClubItem';

const Clubs = ({ getClubs, club: { clubs, loading } }) => {
  useEffect(() => {
    getClubs();
  }, [getClubs]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profiles'>
            <h1 className='large text-primary'>Kluby</h1>
            <Link to='create-club' className='btn btn-warning my-1 white'>
              Dodaj klub
            </Link>
            {/* loop */}
            {clubs.length > 0 ? (
              clubs.map((club) => <ClubItem key={club._id} club={club} />)
            ) : (
              <h4>Nie znaleziono klubów</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Clubs.propTypes = {
  getClubs: PropTypes.func.isRequired,
  club: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  club: state.club,
});

export default connect(mapStateToProps, { getClubs })(Clubs);
