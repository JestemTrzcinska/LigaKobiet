import axios from 'axios';
import { setAlert } from './alert';
import { GET_LEAGUES, LEAGUES_ERROR, GET_LEAGUE, LEAGUE_ERROR } from './types';

//Get league by ID
export const getLeagueById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/league/${id}`);

    dispatch({
      type: GET_LEAGUE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all leagues
export const getLeagues = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/league');

    dispatch({
      type: GET_LEAGUES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEAGUES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update league
export const createLeague = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/league', formData, config);

    dispatch({
      type: GET_LEAGUES,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Liga zaktualizowana' : 'Liga utworzona', 'success')
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LEAGUES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
