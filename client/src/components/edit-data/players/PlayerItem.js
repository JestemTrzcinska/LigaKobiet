import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PlayerItem = ({ player: { _id, firstName, lastName, name } }) => {
  return (
    <div>
      <h6>
        <Link to={`/player/${_id}`}>
          {firstName} {lastName}
        </Link>
      </h6>
      <p>{name}</p>
    </div>
  );
};

PlayerItem.propTypes = {
  player: PropTypes.object.isRequired,
};

export default PlayerItem;
