import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getGames } from '../../../actions/game';
import GameItem from './GameItem';

const Games = ({ getGames, game: { games, loading } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profiles'>
            <h1 className='large text-primary'>Mecze</h1>
            <Link to='create-game' className='btn btn-warning my-1 white'>
              Dodaj mecz
            </Link>
            {/* loop */}
            {games.length > 0 ? (
              games.map((game) => <GameItem key={game._id} game={game} />)
            ) : (
              <h4>Nie znaleziono meczy</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Games.propTypes = {
  getGames: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGames })(Games);
