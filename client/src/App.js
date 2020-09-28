import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import PageNotFound from './components/layout/PageNotFound';
import LoginRegister from './components/auth/LoginRegister';
import Schedule from './components/schedule/Schedule';
import Dashboard from './components/schedule/Dashboard';
import News from './components/news/News';

import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';

//show to edit
import EditData from './components/edit-data/EditData';
import Games from './components/edit-data/games/Games';
import Clubs from './components/edit-data/clubs/Clubs';
import Leagues from './components/edit-data/leagues/Leagues';
import Players from './components/edit-data/players/Players';
import PlayersInClub from './components/edit-data/players/PlayersInClub';
// edit & create
import EditGame from './components/edit-data/games/EditGame';
import CreateGame from './components/edit-data/games/CreateGame';
import EditClub from './components/edit-data/clubs/EditClub';
import CreateClub from './components/edit-data/clubs/CreateClub';
import EditLeague from './components/edit-data/leagues/EditLeague';
import CreateLeague from './components/edit-data/leagues/CreateLeague';
import EditPlayer from './components/edit-data/players/EditPlayer';
import CreatePlayer from './components/edit-data/players/CreatePlayer';
import CreatePlayerInClub from './components/edit-data/players/CreatePlayerInClub';
import EditPlayerInClub from './components/edit-data/players/EditPlayerInClub';

import Game from './components/game/Game';
import Club from './components/club/Club';
import League from './components/league/League';
import Player from './components/player/Player';
import PlayerInClub from './components/player/PlayerInClub';

import PrivateRoute from './components/routing/PrivateRoute';
import IsStaffRoute from './components/routing/IsStaffRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/loginregister' component={LoginRegister} />
            <Route exact path='/schedule' component={Schedule} />
            <Route exact path='/news' component={News} />

            <Route exact path='/game/:id' component={Game} />
            <Route exact path='/club/:id' component={Club} />
            <Route exact path='/league/:id' component={League} />
            <Route exact path='/player/:id' component={Player} />
            <Route exact path='/playerInClub/:id' component={PlayerInClub} />

            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />

            <IsStaffRoute exact path='/edit-data' component={EditData} />
            <IsStaffRoute exact path='/edit-data/games' component={Games} />
            <IsStaffRoute exact path='/edit-data/clubs' component={Clubs} />
            <IsStaffRoute exact path='/edit-data/players' component={Players} />
            <IsStaffRoute
              exact
              path='/edit-data/playersInClub'
              component={PlayersInClub}
            />
            <IsStaffRoute exact path='/edit-data/leagues' component={Leagues} />
            <IsStaffRoute exact path='/edit-game' component={EditGame} />
            <IsStaffRoute exact path='/create-game' component={CreateGame} />
            <IsStaffRoute exact path='/edit-club' component={EditClub} />
            <IsStaffRoute exact path='/create-club' component={CreateClub} />
            <IsStaffRoute exact path='/edit-league' component={EditLeague} />
            <IsStaffRoute
              exact
              path='/create-league'
              component={CreateLeague}
            />
            <IsStaffRoute exact path='/edit-player' component={EditPlayer} />
            <IsStaffRoute
              exact
              path='/create-player'
              component={CreatePlayer}
            />
            <IsStaffRoute
              exact
              path='/edit-playerInClub'
              component={EditPlayerInClub}
            />
            <IsStaffRoute
              exact
              path='/create-playerInClub'
              component={CreatePlayerInClub}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
