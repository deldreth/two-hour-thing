import ApolloClient from 'apollo-boost';

const client = new ApolloClient( {
  uri: 'http://localhost:3000/graphql',
  clientState: {
    defaults: {
      isConnected: true,
      open_book: null,
    },
    resolvers: {
      Mutation: {
        openBook: ( _: {}, variables: { id: string }, { cache } ): void => {
          cache.writeData( { data: { open_book: variables.id } } );
          return null;
        },
        closeBook: ( _, variables, { cache } ): void => {
          cache.writeData( { data: { open_book: null } } );
          return null;
        },
      },
    },
  },
} );

export default client;
