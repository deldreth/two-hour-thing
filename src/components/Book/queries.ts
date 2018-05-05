import api from 'books-mock-api';
import gql from 'graphql-tag';
import { ChildProps, graphql } from 'react-apollo';
import compose from 'recompose/compose';

import { Book } from 'app/types';

export interface BookState {
  books: Book[];
  open?: string;
}

const defaults: BookState = {
  books: [],
  open: null,
};

const bookQuery = gql`
  query GetBooks {
    books @client {
      id
      title
      author
      image
    }
  }
`;

const openBookQuery = gql`
  query OpenBook {
    open @client
  }
`;

export const GET_OPEN_BOOK_QUERY = gql`
  query GetOpenBook($id: ID!) {
    book(id: $id) @client {
      id,
      title,
      author,
      image,
      reviews,
      description,
      checked_out
    }
  }
`;

function book ( _, { id }, { cache } ) {
  return cache.readFragment( {
    id: `Book:${id}`,
    fragment: gql`
      fragment openBook on Book {
        id
        title
        author
        image
        description
        reviews
        checked_out
      }
    `,
  } );
}
