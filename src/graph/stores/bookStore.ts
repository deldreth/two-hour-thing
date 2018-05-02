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

interface BookState {
  books: Book[];
  open?: string;
}

const defaults = {
  books: [],
  open: null,
};

const bookQuery = gql`
  {
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

const initBookMutation = gql`
  mutation initBooks($id: String) {
    initBooks(id: $id) @client
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
    const nextBooks = books.map( book => ( {
      ...book,
      __typename: 'Book',
      reviews: [],
    } ) );

    cache.writeData( {
      data: { books: nextBooks },
    } );

    return null;
  } );
}

function addBook ( _obj, { book }, { cache } ) {
  const { books } = cache.readQuery( { bookQuery } );

  const nextBooks = books.push( book );

  cache.writeQuery( {
    bookQuery,
    data: { books: nextBooks },
  } );
}

function toggleBook ( _obj, book, { cache } ): string | null {
  const { open } = cache.readQuery( { query: openBookQuery } );

  const params = { query: getOpenBookQuery };
  const stuff = cache.readQuery( params );
  console.log( stuff );

  const openBook = ( open === book ) ? null : book.id;
  cache.writeData( {
    query: getOpenBookQuery,
    data: { open: openBook },
  } );

  return openBook;
}

const bookQueryHandler = {
  props: ( { ownProps, data }, last ) => ( {
    ...ownProps,
    books: data.books,
  } ),
};

const openBookQueryHandler = {
  props: ( { ownProps, data: { open = [] } } ) => ( {
    ...ownProps,
    open,
  } ),
};

const store = {
  defaults,
  mutations: {
    initBooks,
    addBook,
    toggleBook,
  },
};

export default {
  store,
  withBooks: compose(
    graphql( bookQuery, bookQueryHandler ),
    graphql( initBookMutation, { name: 'initBookMutation' } ),
    graphql( toggleBookMutation, { name: 'toggleBookMutation' } ),
  ),
};
