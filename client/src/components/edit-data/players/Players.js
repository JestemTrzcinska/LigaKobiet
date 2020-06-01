import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getPlayers } from '../../../actions/player';
import PlayerItem from './PlayerItem';

const Players = ({ getPlayers, player: { players, loading } }) => {
  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profiles'>
            <h1 className='large text-primary'>Zawodniczki</h1>
            {/* loop */}
            {players.length > 0 ? (
              players.map((player) => (
                <PlayerItem key={player._id} player={player} />
              ))
            ) : (
              <h4>Nie znaleziono zawodniczek</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Players.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, { getPlayers })(Players);
