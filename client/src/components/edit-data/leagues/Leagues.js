import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getLeagues } from '../../../actions/league';
import LeagueItem from './LeagueItem';

const Leagues = ({ getLeagues, league: { leagues, loading } }) => {
  useEffect(() => {
    getLeagues();
  }, [getLeagues]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profiles'>
            <h1 className='large text-primary'>Ligi</h1>
            <Link to='create-league' className='btn btn-warning my-1 white'>
              Dodaj ligę
            </Link>
            {/* loop */}
            {leagues.length > 0 ? (
              leagues.map((league) => (
                <LeagueItem key={league._id} league={league} />
              ))
            ) : (
              <h4>Nie znaleziono klubów</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Leagues.propTypes = {
  getLeagues: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  league: state.league,
});

export default connect(mapStateToProps, { getLeagues })(Leagues);
