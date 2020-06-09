import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getPlayersInClub } from '../../../actions/playerInClub';
import PlayerInClubItem from './PlayerInClubItem';

const PlayersInClub = ({
  getPlayersInClub,
  playerInClub: { playersInClub, loading },
}) => {
  useEffect(() => {
    getPlayersInClub();
  }, [getPlayersInClub]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profiles'>
            <h1 className='large text-primary'>Zawodniczki w klubie</h1>
            <Link
              to='create-playerInClub'
              className='btn btn-warning my-1 white'
            >
              Dodaj zawodniczkę w klubie
            </Link>
            {/* loop */}
            {playersInClub.length > 0 ? (
              playersInClub.map((playerInClub) => (
                <PlayerInClubItem
                  key={playerInClub._id}
                  playerInClub={playerInClub}
                />
              ))
            ) : (
              <h4>Nie znaleziono zawodniczek w klubie</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

PlayersInClub.propTypes = {
  getPlayersInClub: PropTypes.func.isRequired,
  playerInClub: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  playerInClub: state.playerInClub,
});

export default connect(mapStateToProps, { getPlayersInClub })(PlayersInClub);
