import { Book } from 'app/types';

import BookMutations from 'app/graph/Book/mutations';
import BookQueries from 'app/graph/Book/queries';

export interface BookState {
  books: Book[];
  open?: string;
}

const defaults: BookState = {
  books: [],
  open: null,
};

export default {
  defaults,
  queries: BookQueries,
  mutations: BookMutations,
};
