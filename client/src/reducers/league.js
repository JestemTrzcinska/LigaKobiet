import {
  GET_LEAGUES,
  LEAGUES_ERROR,
  GET_LEAGUE,
  LEAGUE_ERROR,
} from '../actions/types';

const initalState = {
  league: null,
  leagues: [],
  loading: true,
  error: {},
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEAGUE:
      return {
        ...state,
        league: payload,
        loading: false,
      };
    case GET_LEAGUES:
      return {
        ...state,
        leagues: payload,
        loading: false,
      };
    case LEAGUE_ERROR:
    case LEAGUES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
