import {
  GET_PLAYERS,
  PLAYERS_ERROR,
  GET_PLAYER,
  PLAYER_ERROR,
} from '../actions/types';

const initalState = {
  player: null,
  players: [],
  loading: true,
  error: {},
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PLAYER:
      return {
        ...state,
        player: payload,
        loading: false,
      };
    case GET_PLAYERS:
      return {
        ...state,
        players: payload,
        loading: false,
      };
    case PLAYER_ERROR:
    case PLAYERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
