import axios from 'axios';
import { setAlert } from './alert';
import { GET_GAMES, GAMES_ERROR, GET_GAME, GAME_ERROR } from './types';

//Get game by ID
export const getGameById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/game/${id}`);

    dispatch({
      type: GET_GAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all games
export const getGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/game');

    dispatch({
      type: GET_GAMES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GAMES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update game
export const createGame = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/game', formData, config);

    dispatch({
      type: GET_GAME,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Mecz zaktualizowany' : 'Mecz utworzony', 'success')
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
