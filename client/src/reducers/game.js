import { GET_GAMES, GAMES_ERROR, GET_GAME, GAME_ERROR } from '../actions/types';

const initalState = {
  game: null, // ?
  games: [], // list of games ?
  // repos: []
  loading: true,
  error: {},
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GAME:
      return {
        ...state,
        game: payload,
        loading: false,
      };
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        loading: false,
      };
    case GAME_ERROR:
    case GAMES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
