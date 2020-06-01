import axios from 'axios';
import { setAlert } from './alert';
import { GET_CLUBS, CLUBS_ERROR, GET_CLUB, CLUB_ERROR } from './types';

//Get club by ID
export const getClubById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/club/${id}`);

    dispatch({
      type: GET_CLUB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLUB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all clubs
export const getClubs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/club');

    dispatch({
      type: GET_CLUBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLUBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update club
export const createClub = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/club', formData, config);

    dispatch({
      type: GET_CLUBS,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Klub zaktualizowany' : 'Klub utworzony', 'success')
    );
    // history.push('/')
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CLUBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
