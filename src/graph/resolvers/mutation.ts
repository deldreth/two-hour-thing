import api from 'books-mock-api';
import gql from 'graphql-tag';

import { Book } from 'app/types';

interface BookInput {
  title: string;
  author: string;
  image: string;
  checked_out: string;
  description: string;
}

function getBooks ( _, variables, { cache } ): null {
  api.getBooks().then( books => {
    const cachedBooks = books.map( book => {
      const reviews = book.reviews.map( review => ( { __typename: 'Review', ...review } ) );
      
      return {
        __typename: 'Book',
        ...book,
        reviews,
      };
    } );

    cache.writeData( { data: { books: cachedBooks } } );
  } );

  return null;
}

function openBook ( _: {}, variables: { id: string }, { cache } ): void {
  cache.writeData( { data: { open_book: variables.id } } );
  return null;
}

function closeBook ( _, variables, { cache } ): void {
  cache.writeData( { data: { open_book: null } } );
  return null;
}

function addingBook ( _, variables, { cache, getCacheKey } ): void {
  const data = cache.readQuery( {
    query: gql`
      {
        addingBook @client
      }
    `,
  } );

  cache.writeData( { data: { addingBook: !data.addingBook } } );
  return null;
}

async function createBook( input: BookInput ): Promise<Book> {
  return null;
}

async function updateBook( id: string, input: BookInput ): Promise<Book> {
  return null;
}

export default {
  getBooks,
  openBook,
  closeBook,
  addingBook,
};
