// tslint:disable //
import api from 'books-mock-api';
import gql from 'graphql-tag';
import { ChildProps, graphql } from 'react-apollo';
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

// function QueryResolver <Return>(): <Return>;
const printPoint: ( _: {}, vars: string[] ) => string;
type QueryResolver = ( _: {}, vars: string[] ) => void;

const stuff = <printPoint>() => {
  
}

function book ( _, vars, ctx ) {
  console.log( 'first', _ );
  console.log( 'second', vars );
  console.log( 'last', ctx );
  return ctx.cache.readFragment( {
    id: `Book:${vars.id}`,
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

function initBooks ( _obj: any, id: any, { cache }: any ): Promise<Book[]> {
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

interface WithBooksResp {
  books: Book[];
}
interface Variables {}
interface InputProps {}
type WithBooksProps = ChildProps<any, WithBooksResp, {}>;

// signature: Input, Response, Variables, ChildProps
const withBooksHandler = graphql<any, WithBooksResp, {}, WithBooksProps>( bookQuery, {
  props: ( { ownProps, data } ) => ( {
    ...ownProps,
    books: data.books,
  } ),
} );

interface WithOpenBookResp {
  open?: string;
}
type WithOpenBookProps = ChildProps<any, WithOpenBookResp, {}>;
const withOpenBook = graphql<InputProps, WithOpenBookResp, Variables, WithOpenBookResp>( openBookQuery, {
  props: ( { ownProps, data } ) => ( {
    ...ownProps,
    open: data.open,
  } ),
} );

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

export default store;
export const withBooks = compose<BookState, {}>(
  withBooksHandler,
  withOpenBook,
  graphql( initBookMutation, { name: 'initBookMutation' } ),
  graphql( toggleBookMutation, { name: 'toggleBookMutation' } ),
);
