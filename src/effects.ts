import bookApi from 'books-mock-api';
import { Effect, EffectParams } from 'redux-effex';

import { CreateBookAction, FetchAllAction, receiveBooks,
  receiveUsers, StartAction, Types } from 'app/actions';

async function start ( { action, dispatch }: EffectParams<StartAction> ): Promise<any> {
  return null;
}

async function fetchAll ( { dispatch }: EffectParams<FetchAllAction> ): Promise<any> {
  dispatch( receiveBooks( await bookApi.getBooks() ) );
  dispatch( receiveUsers( await bookApi.getUsers() ) );
}

async function createBook ( { action, dispatch }: EffectParams<CreateBookAction> ): Promise<any> {
  await bookApi.createBook( action.payload.book );
  dispatch( receiveBooks( await bookApi.getBooks() ) );
}

export default [
  { action: Types.START, effect: start },
  { action: Types.FETCH_ALL, effect: fetchAll },
  { action: Types.CREATE_BOOK, effect: createBook },
];
