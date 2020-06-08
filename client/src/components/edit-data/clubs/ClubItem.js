import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ClubItem = ({ club: { _id, name, league, logo } }) => {
  return (
    <div className=''>
      <div>
        <h6>
          <Link to={`/club/${_id}`}>{name}</Link>
        </h6>
        <p>{league.name}</p>
      </div>
    </div>
  );
};

ClubItem.propTypes = {
  club: PropTypes.object.isRequired,
};

export default ClubItem;
