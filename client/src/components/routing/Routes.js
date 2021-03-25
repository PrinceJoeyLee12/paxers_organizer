import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import AuthLandingPage from '../auth';
import PrivateRoute from './PrivateRoute';
import LandingPage from '../layouts/LandingPage';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={AuthLandingPage} />
        <Route exact path='/register' component={AuthLandingPage} />
        <Route exact path='/forgot-password' component={AuthLandingPage} />
        <Route
          exact
          path='/reset-password/:token'
          component={AuthLandingPage}
        />
        <PrivateRoute exact path='/' component={AuthLandingPage} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
