import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame } from '../../../actions/game';

const CreateGame = ({ createGame }) => {
  const [formData, setFormData] = useState({
    teamHome: '',
    teamAway: '',
    league: '',
    localization: '',
    date: '',
    goals: [],
  });

  const [amount, setAmount] = useState(0);
  const [goalForTeamHome, setGoalForTeamHome] = useState(false);
  const [shotBy, setShotBy] = useState('');
  const [isOwn, setIsOwn] = useState(false);

  const [displayGoalsInput, toggleGoalsInputs] = useState(false);

  const { teamHome, teamAway, league, localization, date, goals } = formData;

  const addGoal = () => {
    const goal = { amount, goalForTeamHome, shotBy, isOwn };
    setFormData({ ...formData, goals: [...goals, goal] });
    setAmount(0);
    setGoalForTeamHome(goalForTeamHome);
    setShotBy('');
    setIsOwn(isOwn);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createGame(formData);
  };

  return (
    <div className='beginning'>
      <Fragment>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Dodanie meczu:
          </p>
          <div className='form-group'>
            <small className='form-text'>Gospodarz:</small>
            <input
              type='text'
              placeholder='Gospodarz'
              name='teamHome'
              value={teamHome}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Gość:</small>
            <input
              type='text'
              placeholder='Gość'
              name='teamAway'
              value={teamAway}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Data spotkania:</small>
            <input
              type='text'
              placeholder='Data spotkania'
              name='date'
              value={date}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Liga:</small>
            <input
              type='text'
              placeholder='Liga'
              name='league'
              value={league}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <small className='form-text'>Miejsce spotkania:</small>
            <input
              type='text'
              placeholder='Miejsce spotkania'
              name='localization'
              value={localization}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='my-2'>
            <Button
              onClick={() => toggleGoalsInputs(!displayGoalsInput)}
              className='btn btn-primary'
            >
              Dodaj bramki
            </Button>
            <p></p>
          </div>
          {displayGoalsInput && (
            <Fragment>
              <small className='form-text'>
                Jedna linijka to jedna strzelczyni bramki. Przykładowo: wynik
                2:0 więc ZawodniczkaA ilość bramek 1, ZawodniczkaB ilość bramek
                2
              </small>
              <div className='form-group'>
                <small className='form-text'>Kto strzelił bramkę:</small>
                <input
                  type='text'
                  placeholder='Kto strzelił'
                  name='shotBy'
                  value={shotBy}
                  onChange={(e) => setShotBy(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <small className='form-text'>
                  Ilość bramek jednej zawodniczki:
                </small>
                <input
                  type='number'
                  placeholder='Ilość bramek'
                  name='amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <small className='form-text'>
                  Czy bramka padła dla drużyny gospodarzy:
                </small>
                <input
                  type='checkbox'
                  placeholder='Czy bramka dla gospodarzy'
                  name='goalForTeamHome'
                  value={goalForTeamHome}
                  onChange={(e) => setGoalForTeamHome(e.target.checked)}
                />
              </div>
              <div className='form-group'>
                <small className='form-text'>Czy był to samobój:</small>
                <input
                  type='checkbox'
                  placeholder='Czy był to samobój'
                  name='isOwn'
                  value={isOwn}
                  onChange={(e) => setIsOwn(e.target.checked)}
                />
              </div>
              <Button onClick={() => addGoal()} className='btn btn-primary'>
                Dodaj bramkę
              </Button>
            </Fragment>
          )}
          <input type='submit' className='btn btn-primary' value='Potwierdź' />{' '}
          <Link className='btn btn-warning my-1 white' to='edit-data'>
            Wróć
          </Link>
        </form>
      </Fragment>
    </div>
  );
};

CreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
};

export default connect(null, { createGame })(CreateGame);
