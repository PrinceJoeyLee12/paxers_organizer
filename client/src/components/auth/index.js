import React, { Suspense, Fragment } from 'react';

import FallBack from '../layouts/FallBack';

//components
const Login = React.lazy(() => import('./Login'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));
const Register = React.lazy(() => import('./Register'));
const ResetPassword = React.lazy(() => import('./ResetPassword'));

const AuthLanding = ({ match }) => {
  return (
    <Fragment>
      <Suspense fallback={<FallBack />}>
        {match.url === '/login' ? (
          <Login />
        ) : match.url === '/register' ? (
          <Register />
        ) : match.url === '/forgot-password' ? (
          <ForgotPassword />
        ) : (
          <ResetPassword />
        )}
      </Suspense>
    </Fragment>
  );
};

export default AuthLanding;
