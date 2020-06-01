import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const GameItem = ({ game: { _id, teamHome, teamAway, league, date } }) => {
  return (
    <div>
      <h6>
        <Link to={`/game/${_id}`}>
          {teamHome.name} : {teamAway.name}
        </Link>
      </h6>
      <p>
        <Moment format='HH:mm DD/MM/YYYY'>{date}</Moment>
        <p>{league.name}</p>
      </p>
    </div>
  );
};

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameItem;
