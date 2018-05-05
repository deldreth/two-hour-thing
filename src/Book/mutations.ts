import api from 'books-mock-api';
import gql from 'graphql-tag';

import { BOOK_QUERY, OPEN_BOOK_QUERY } from 'app/components/Book/queries';
import { Book } from 'app/types';

const initBookMutation = gql`
  mutation initBooks {
    initBooks @client {
      id
    }
  }
`;

// const addBookMutation = gql`
//   mutation addBook($input: BookInput) {
//     addBook(input: $input) @client
//   }
// `;

const toggleBookMutation = gql`
  mutation toggleBook($id: ID!) {
    toggleBook(id: $id) @client {
      id
    }
  }
`;

function initBooks ( _obj: {}, variables: {}, { cache }: any ): Promise<Book[]> {
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
  const { books } = cache.readQuery( { BOOK_QUERY } );

  const nextBooks = books.push( data );

  cache.writeQuery( {
    BOOK_QUERY,
    data: { books: nextBooks },
  } );
}

function toggleBook ( _obj, { id }, { cache } ): string | null {
  const { open } = cache.readQuery( { query: OPEN_BOOK_QUERY } );

  const openBook = ( open ) ? null : id;
  cache.writeData( {
    data: { open: openBook },
  } );

  return openBook;
}

export default {
  initBooks,
  addBook,
  toggleBook,
};
