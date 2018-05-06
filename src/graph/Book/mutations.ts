import api from 'books-mock-api';
import gql from 'graphql-tag';

import { BOOK_QUERY, OPEN_BOOK_QUERY } from 'app/graph/Book/queries';
import { toggleBookMutationVariables } from 'app/graph/types';
import { Book, StateCache } from 'app/types';

export const initBookMutation = gql`
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

export const toggleBookMutation = gql`
  mutation toggleBook($id: ID!) {
    toggleBook(id: $id) @client {
      id
    }
  }
`;

function initBooks ( _obj: {}, vars: any, { cache }: StateCache ): Promise<Book[]> {
  return api.getBooks().then( books => {
    const nextBooks = books.map( bookToType => ( {
      ...bookToType,
      __typename: 'Book',
      reviews: [],
    } ) );

    cache.writeData( {
      data: { books: nextBooks },
    } );

    return nextBooks;
  } );
}

// function addBook ( _obj: {}, { data }, { cache } ) {
//   const { books } = cache.readQuery( { BOOK_QUERY } );

//   const nextBooks = books.push( data );

//   cache.writeQuery( {
//     BOOK_QUERY,
//     data: { books: nextBooks },
//   } );
// }

function toggleBook ( _obj: {}, vars: toggleBookMutationVariables, { cache }: StateCache ): string | null {
  const { open } = cache.readQuery( { query: OPEN_BOOK_QUERY } );
  
  const openBook = ( open ) ? null : vars.id;
  cache.writeData( {
    data: {
      open: openBook,
    },
  } );

  return openBook;
}

export default {
  initBooks,
  toggleBook,
};
