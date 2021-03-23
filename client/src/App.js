import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Routes from './components/routing/Routes';
import Navbar from './components/layouts/Navbar.main';

import './App.css';

const client = new ApolloClient({
  uri: '/graphql',
});

function App() {
  return (
    <div className='App'>
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
    </div>
  );
}

export default App;
