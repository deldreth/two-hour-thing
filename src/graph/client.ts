import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { withClientState } from 'apollo-link-state';

import gql from 'graphql-tag';

import BookGraph from 'app/graph/Book';

const cache = new InMemoryCache();

const stateLink = withClientState( {
  cache,
  defaults: {
    ...BookGraph.defaults,
  },
  resolvers: {
    Query: {
      ...BookGraph.queries,
    },
    Mutation: {
      ...BookGraph.mutations,
    },
  },
} );

const client = new ApolloClient( {
  cache,
  link: stateLink,
} );

export default client;
