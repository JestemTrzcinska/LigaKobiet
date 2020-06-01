import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const LeagueItem = ({ league: { _id, name, from, to } }) => {
  return (
    <div>
      <h6>
        <Link to={`/league/${_id}`}>{name}</Link>
      </h6>
      <p>
        <Moment format='DD/MM/YYYY'>{from}</Moment> -
        <Moment format='DD/MM/YYYY'>{to}</Moment>
      </p>
    </div>
  );
};

LeagueItem.propTypes = {
  league: PropTypes.object.isRequired,
};

export default LeagueItem;
