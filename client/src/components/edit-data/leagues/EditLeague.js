import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLeague, getLeagueById } from '../../../actions/league';
// import Moment from 'react-moment'

const EditLeague = ({
  league: { league, loading },
  createLeague,
  getLeagueById,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
  });
  // goals

  useEffect(() => {
    getLeagueById();

    setFormData({
      name: loading || !league.name ? '' : league.name,
      from: loading || !league.from ? '' : league.from,
      to: loading || !league.to ? '' : league.to,
    });
  }, [loading, getLeagueById]);

  const { name, from, to } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createLeague(formData, true);
  };

  const linkTo = `/league/${league._id}`;

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Edycja ligi
          </p>
          <div className='form-group'>
            <small className='form-text'>Nazwa:</small>
            <input
              type='text'
              placeholder='Nazwa'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Od:</small>
            <input
              type='text'
              placeholder='Od'
              name='from'
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Do:</small>
            <input
              type='text'
              placeholder='Do'
              name='to'
              value={to}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Potwierdź' />{' '}
          <Link className='btn btn-warning my-1 white' to={linkTo}>
            Wróć
          </Link>
        </form>
      </Fragment>
    </div>
  );
};

EditLeague.propTypes = {
  createLeague: PropTypes.func.isRequired,
  getLeagueById: PropTypes.func.isRequired,
  league: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  league: state.league,
});

export default connect(mapStateToProps, { createLeague, getLeagueById })(
  EditLeague
);
