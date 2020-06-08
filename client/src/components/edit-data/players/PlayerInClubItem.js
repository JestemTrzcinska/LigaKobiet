import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PlayerInClubItem = ({ playerInClub: { _id, player, club, current } }) => {
  return (
    <div className=''>
      <div>
        <h6>
          <Link to={`/playerInClub/${_id}`}>
            {player.firstName} {player.lastName}
            {'  '}
            {club.name}
          </Link>
        </h6>
        <p>{current}</p>
      </div>
    </div>
  );
};

PlayerInClubItem.propTypes = {
  playerInClub: PropTypes.object.isRequired,
};

export default PlayerInClubItem;
