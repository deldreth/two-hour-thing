import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { withClientState } from 'apollo-link-state';

import gql from 'graphql-tag';

import BookStore from 'app/graph/stores/bookStore';

const cache = new InMemoryCache();

const stateLink = withClientState( {
  cache,
  defaults: {
    ...BookStore.defaults,
  },
  resolvers: {
    Query: {
      ...BookStore.query,
    },
    Mutation: {
      ...BookStore.mutations,
    },
  },
} );

const client = new ApolloClient( {
  cache,
  link: stateLink,
} );

export default client;
