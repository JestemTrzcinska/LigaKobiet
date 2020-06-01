import { GET_CLUBS, CLUBS_ERROR, GET_CLUB, CLUB_ERROR } from '../actions/types';

const initalState = {
  club: null, // ?
  clubs: [], // list of clubs ?
  // repos: []
  loading: true,
  error: {},
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLUB:
      return {
        ...state,
        club: payload,
        loading: false,
      };
    case GET_CLUBS:
      return {
        ...state,
        clubs: payload,
        loading: false,
      };
    case CLUB_ERROR:
    case CLUBS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
