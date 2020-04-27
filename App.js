import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';

import client from './src/client';
import Home from './src/Home';

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);

export default App;
