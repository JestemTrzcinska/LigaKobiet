import axios from 'axios';
// import { setAlert } from './alert';
import { GET_GAMES, GET_GAMES_ERROR } from './types';

//Get games
export const getGames = () => async dispatch => {
  try {
    const res = await axios.get('/api/game');

    dispatch({
      type: GET_GAMES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_GAMES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
