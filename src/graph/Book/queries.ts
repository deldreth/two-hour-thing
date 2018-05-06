import api from 'books-mock-api';
import gql from 'graphql-tag';
import { ChildProps, graphql } from 'react-apollo';
import compose from 'recompose/compose';

import { GetOpenBookQueryVariables } from 'app/graph/types';
import { Book, StateCache } from 'app/types';

export const BOOK_QUERY = gql`
  query GetBooks {
    books @client {
      id
      title
      author
      image
    }
  }
`;

export const OPEN_BOOK_QUERY = gql`
  query OpenBook {
    open @client
  }
`;

export const GET_OPEN_BOOK_QUERY = gql`
  query GetOpenBook($id: ID!) {
    book(id: $id) @client {
      id
      title
      author
      image
      reviews {
        id
      }
      description
      checked_out
    }
  }
`;

function book ( _: {}, vars: GetOpenBookQueryVariables, { cache }: StateCache ) {
  return cache.readFragment( {
    id: `Book:${vars.id}`,
    fragment: gql`
      fragment openBook on Book {
        id
        title
        author
        image
        description
        reviews {
          id
        }
        checked_out
      }
    `,
  } );
}

export default {
  book,
};
