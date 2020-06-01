import React, { Fragment, useEffect } from 'react';
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
