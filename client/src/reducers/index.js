import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import game from './game';
import club from './club';
import league from './league';
import player from './player';
import playerInClub from './playerInClub';

export default combineReducers({
  alert,
  auth,
  profile,
  game,
  club,
  league,
  player,
  playerInClub,
});
