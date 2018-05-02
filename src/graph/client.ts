import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { toIdValue } from 'apollo-utilities';

import Mutation from 'app/graph/resolvers/mutation';

import BookStore from 'app/graph/stores/bookStore';

const cache = new InMemoryCache();

const stateLink = withClientState( {
  cache,
  defaults: {
    ...BookStore.store.defaults,
  },
  resolvers: {
    Mutation: {
      ...BookStore.store.mutations,
    },
  },
} );

const client = new ApolloClient( {
  cache,
  link: stateLink,
} );

export default client;
