import {
  GET_PLAYERSINCLUB,
  PLAYERSINCLUB_ERROR,
  GET_PLAYERINCLUB,
  PLAYERINCLUB_ERROR,
} from '../actions/types';

const initalState = {
  playerInClub: null,
  playersInClub: [],
  loading: true,
  error: {},
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PLAYERINCLUB:
      return {
        ...state,
        playerInClub: payload,
        loading: false,
      };
    case GET_PLAYERSINCLUB:
      return {
        ...state,
        playersInClub: payload,
        loading: false,
      };
    case PLAYERINCLUB_ERROR:
    case PLAYERSINCLUB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
