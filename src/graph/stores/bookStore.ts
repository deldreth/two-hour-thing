import api from 'books-mock-api';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';

import { Book } from 'app/types';

interface BookInput {
  title: string;
  author: string;
  image: string;
  checked_out: string;
  description: string;
}

export interface BookState {
  books: Book[];
  open?: string;
  initBookMutation?: () => void;
  toggleBookMutation?: ( { variables: { id } } ) => void;
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

const getOpenBookQuery = gql`
  query GetOpenBook($id: ID!) {
    books(id: $id) @client {
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

const initBookMutation = gql`
  mutation initBooks {
    initBooks @client
  }
`;

const addBookMutation = gql`
  mutation addBook($input: BookInput) {
    addBook(input: $input) @client
  }
`;

const toggleBookMutation = gql`
  mutation toggleBook($id: ID!) {
    toggleBook(id: $id) @client
  }
`;

function initBooks ( _obj, id, { cache } ): Promise<Book[]> {
  return api.getBooks().then( books => {
    const nextBooks = books.map( bookToType => ( {
      ...bookToType,
      __typename: 'Book',
      reviews: [],
    } ) );

    cache.writeData( {
      data: { books: nextBooks },
    } );

    return null;
  } );
}

function addBook ( _obj, { data }, { cache } ) {
  const { books } = cache.readQuery( { bookQuery } );

  const nextBooks = books.push( data );

  cache.writeQuery( {
    bookQuery,
    data: { books: nextBooks },
  } );
}

function toggleBook ( _obj, { id }, { cache } ): string | null {
  const { open } = cache.readQuery( { query: openBookQuery } );

  const openBook = ( open ) ? null : id;
  cache.writeData( {
    data: { open: openBook },
  } );

  return openBook;
}

const store = {
  defaults,
  query: {
    book,
  },
  mutations: {
    initBooks,
    addBook,
    toggleBook,
  },
};

const bookQueryHandler = {
  props: ( { ownProps, data }, last ) => ( {
    ...ownProps,
    books: data.books,
  } ),
};

const openBookHandler = {
  props: ( { ownProps, data }, last ) => ( {
    ...ownProps,
    open: data.open,
  } ),
};

export default {
  store,
  withBooks: compose<BookState, {}>(
    graphql( bookQuery, bookQueryHandler ),
    graphql( openBookQuery, openBookHandler ),
    graphql( initBookMutation, { name: 'initBookMutation' } ),
    graphql( toggleBookMutation, { name: 'toggleBookMutation' } ),
  ),
};
