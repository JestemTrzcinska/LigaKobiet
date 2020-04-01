import { GET_GAMES, GET_GAMES_ERROR } from '../actions/types';

const initalState = {
  game: null, // ?
  games: [], // list of games ?
  loading: true,
  error: {}
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        game: payload,
        loading: false
      };
    case GET_GAMES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
