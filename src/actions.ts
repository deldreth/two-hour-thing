import { Action, ActionCreator } from 'redux';

import { Book, User } from 'app/types';

export const enum Types {
  START = 'START',
  FETCH_ALL = 'FETCH_ALL',
  RECEIVE_BOOKS = 'RECEIVE_BOOKS',
  RECEIVE_USERS = 'RECEIVE_USERS',
  OPEN_BOOK = 'OPEN_BOOK',
  CREATE_BOOK = 'CREATE_BOOK',
  UPDATE_BOOK = 'UPDATE_BOOK',
  CHECKOUT_BOOK = 'CHECKOUT_BOOK',
  RETURN_BOOK = 'RETURN_BOOK',
}

export interface StartAction extends Action {
  type: Types.START;
  payload: {};
}

export interface FetchAllAction extends Action {
  type: Types.FETCH_ALL;
  payload: {};
}

export interface ReceiveUsersAction extends Action {
  type: Types.RECEIVE_USERS;
  payload: {
    users: User[],
  };
}

export interface ReceiveBooksAction extends Action {
  type: Types.RECEIVE_BOOKS;
  payload: {
    books: Book[],
  };
}

export interface OpenBookAction extends Action {
  type: Types.OPEN_BOOK;
  payload: {
    book_id: string,
  };
}

export interface CreateBookAction extends Action {
  type: Types.CREATE_BOOK;
  payload: {
    book: Book,
  };
}

export interface UpdateBookAction extends Action {
  type: Types.UPDATE_BOOK;
  payload: {
    book: Book,
  };
}

export interface CheckoutBookAction extends Action {
  type: Types.CHECKOUT_BOOK;
  payload: {
    user_id: string,
    book_id: string,
  };
}

export interface ReturnBookAction extends Action {
  type: Types.RETURN_BOOK;
  payload: {
    book_id: string,
  };
}

export const start = (): StartAction => ( {
  type: Types.START,
  payload: {},
} );

export const fetchAll = (): FetchAllAction => ( {
  type: Types.FETCH_ALL,
  payload: {},
} );

export const receiveUsers = ( users: User[] ): ReceiveUsersAction => ( {
  type: Types.RECEIVE_USERS,
  payload: { users },
} );

export const receiveBooks = ( books: Book[] ): ReceiveBooksAction => ( {
  type: Types.RECEIVE_BOOKS,
  payload: { books },
} );

export const openBook = ( book_id: string ): OpenBookAction => ( {
  type: Types.OPEN_BOOK,
  payload: { book_id },
} );

export const createBook = ( book: Book ): CreateBookAction => ( {
  type: Types.CREATE_BOOK,
  payload: { book },
} );

export const updateBook = ( book: Book ): UpdateBookAction => ( {
  type: Types.UPDATE_BOOK,
  payload: { book },
} );

export const checkoutBook = ( user_id: string, book_id: string ): CheckoutBookAction => ( {
  type: Types.CHECKOUT_BOOK,
  payload: { user_id, book_id },
} );

export const returnBook = ( book_id: string ): ReturnBookAction => ( {
  type: Types.RETURN_BOOK,
  payload: { book_id },
} );

export const Creators = {
  start,
  fetchAll,
  receiveUsers,
  receiveBooks,
  openBook,
  createBook,
  updateBook,
  checkoutBook,
  returnBook,
};
