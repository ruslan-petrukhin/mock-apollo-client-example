import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {getResolvers} from './gql';

const link = createHttpLink({uri: ''});
const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
  resolvers: getResolvers(cache),
});

const data = {
  process: {
    __typename: 'Process',
    flow: 'new',
  },
  userDetails: {
    __typename: 'UserDetails',
    fullName: '',
    email: '',
  },
};

cache.writeData({data});

export default client;
