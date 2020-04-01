import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import LoginRegister from './components/auth/LoginRegister';
import Alert from './components/layout/Alert';
import Schedule from './components/schedule/Schedule';
import Dashboard from './components/schedule/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';

import PrivateRoute from './components/routing/PrivateRoute';
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
            <PrivateRoute exact path='/schedule' component={Schedule} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
