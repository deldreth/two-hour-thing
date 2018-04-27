import { combineReducers, Reducer } from 'redux';

import { CheckoutBookAction, OpenBookAction, ReceiveBooksAction,
  ReceiveUsersAction, ReturnBookAction, StartAction,
  Types } from 'app/actions';
import { Book, User } from 'app/types';
import { mongucer } from 'app/utils';

interface App {
  loaded: boolean;
  open_book?: string;
  users: User[];
  books: Book[];
}

export type AppState = Readonly<App>;

export interface RootState {
  app: AppState;
}

export const initialState: AppState = {
  loaded: false,
  open_book: null,
  users: [],
  books: [],
};

function start ( state: AppState = initialState, action: StartAction ): AppState {
  return {
    ...state,
    loaded: true,
  };
}

function openBook ( state: AppState = initialState, action: OpenBookAction ): AppState {
  return {
    ...state,
    open_book: action.payload.book_id,
  };
}

function receiveBooks ( state: AppState = initialState, action: ReceiveBooksAction ): AppState {
  return {
    ...state,
    books: action.payload.books,
  };
}

function receiveUsers ( state: AppState = initialState, action: ReceiveUsersAction ): AppState {
  return {
    ...state,
    users: action.payload.users,
  };
}

function checkoutBook ( state: AppState = initialState, action: CheckoutBookAction ): AppState {
  return {
    ...state,
    books: state.books.map( book => {
      if ( book.id === action.payload.book_id ) {
        book.checked_out = action.payload.user_id;
      }

      return book;
    } ),
  };
}

function returnBook ( state: AppState = initialState, action: ReturnBookAction ): AppState {
  return {
    ...state,
    books: state.books.map( book => {
      if ( book.id === action.payload.book_id ) {
        book.checked_out = null;
      }

      return book;
    } ),
  };
}

const handlers = {
  [ Types.START ]: start,
  [ Types.OPEN_BOOK ]: openBook,
  [ Types.RECEIVE_BOOKS ]: receiveBooks,
  [ Types.RECEIVE_USERS ]: receiveUsers,
  [ Types.CHECKOUT_BOOK ]: checkoutBook,
  [ Types.RETURN_BOOK ]: returnBook,
};

export default combineReducers( {
  app: mongucer( initialState, handlers ),
} );
