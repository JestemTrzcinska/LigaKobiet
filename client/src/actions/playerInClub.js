import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PLAYERSINCLUB,
  PLAYERSINCLUB_ERROR,
  GET_PLAYERINCLUB,
  PLAYERINCLUB_ERROR,
} from './types';

//Get playerInClub by ID
export const getPlayerInClubById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/playerInClub/${id}`);

    dispatch({
      type: GET_PLAYERINCLUB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYERINCLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get playerInClub by playerID
export const getPlayerInClubByPlayerId = (playerid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/playerInClub/player/${playerid}`);

    dispatch({
      type: GET_PLAYERINCLUB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYERINCLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all playersInClub
export const getPlayersInClub = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/playerInClub');

    dispatch({
      type: GET_PLAYERSINCLUB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYERSINCLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update playerInClub
export const createPlayerInClub = (formData, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/playerInClub', formData, config);

    dispatch({
      type: GET_PLAYERSINCLUB,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit
          ? 'Zawodniczka w klubie zaktualizowana'
          : 'Zawodniczka w klubie utworzona',
        'success'
      )
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PLAYERSINCLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
