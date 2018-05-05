import { ChildProps, graphql } from 'react-apollo';
import compose from 'recompose/compose';

import { Book } from 'app/types';

import { BOOK_QUERY, OPEN_BOOK_QUERY } from 'app/Book/queries';

export interface BookState {
  books: Book[];
  open?: string;
  initBookMutation: () => void;
  toggleBookMutation: () => void;
}

interface WithBooksResp {
  books: Book[];
}
interface Variables {}
interface InputProps {}
type WithBooksProps = ChildProps<any, WithBooksResp, {}>;

// signature: Input, Response, Variables, ChildProps
const withBooksHandler = graphql<any, WithBooksResp, {}, WithBooksProps>( BOOK_QUERY, {
  props: ( { ownProps, data } ) => ( {
    ...ownProps,
    books: data.books,
  } ),
} );

interface WithOpenBookResp {
  open?: string;
}
type WithOpenBookProps = ChildProps<any, WithOpenBookResp, {}>;
const withOpenBook = graphql<InputProps, WithOpenBookResp, Variables, WithOpenBookResp>( OPEN_BOOK_QUERY, {
  props: ( { ownProps, data } ) => ( {
    ...ownProps,
    open: data.open,
  } ),
} );

export default ( Component: React.ComponentClass<BookState> ) => ( props: any ) => {
  return compose<BookState, {}>(
    withBooksHandler,
    withOpenBook,
    // graphql( initBookMutation, { name: 'initBookMutation' } ),
    // graphql( toggleBookMutation, { name: 'toggleBookMutation' } ),
  )( Component );
};
