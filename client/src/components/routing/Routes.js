import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import AuthLandingPage from '../auth';
import PrivateRoute from './PrivateRoute';
import LandingPage from '../layouts/LandingPage';
import NotFound from '../notFound';
import ContactUs from '../contact-us';

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
        <Route exact path='/contact-us' component={ContactUs} />
        <PrivateRoute exact path='/' component={AuthLandingPage} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
