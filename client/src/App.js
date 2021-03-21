import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Routes from './components/routing/Routes';

import './App.css';

const client = new ApolloClient({
  uri: '/graphql',
});

function App() {
  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Switch>
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
