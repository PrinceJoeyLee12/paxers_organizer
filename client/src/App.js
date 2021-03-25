import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Routes from './components/routing/Routes';
import Navbar from './components/layouts/Navbar.main';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: '/graphql',
});

function App() {
  //Check Token
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    //Logout user out from all tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT });
      }
    });
  }, []);

  return (
    <div className='App'>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <Navbar>
              <Fragment>
                <Switch>
                  <Route component={Routes} />
                </Switch>
              </Fragment>
            </Navbar>
          </Router>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
