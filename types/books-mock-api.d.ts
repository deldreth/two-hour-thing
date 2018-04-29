declare module 'books-mock-api' {
  import { Book, User } from 'app/types';

  interface api {
    getUsers: () => Promise<User[]>,
    getBooks: () => Promise<Book[]>,
    createBook: ( book: Book ) => Promise<Book>,
    updateBook: ( book: Book ) => Promise<Book>
  }

  const Api: api;
  export default Api;
}
