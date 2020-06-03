import axios from 'axios';
import { setAlert } from './alert';
import { GET_PLAYERS, PLAYERS_ERROR, GET_PLAYER, PLAYER_ERROR } from './types';

//Get player by ID
export const getPlayerById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/player/${id}`);

    dispatch({
      type: GET_PLAYER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all players
export const getPlayers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/player');

    dispatch({
      type: GET_PLAYERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update player
export const createPlayer = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/player', formData, config);

    dispatch({
      type: GET_PLAYER,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit ? 'Zawodniczka zaktualizowana' : 'Zawodniczka utworzony',
        'success'
      )
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PLAYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
