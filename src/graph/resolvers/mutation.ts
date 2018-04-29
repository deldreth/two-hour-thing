import { Book } from 'app/types';

interface BookInput {
  title: string;
  author: string;
  image: string;
  checked_out: string;
  description: string;
}

async function createBook( input: BookInput ): Promise<Book> {
  return null;
}

async function updateBook( id: string, input: BookInput ): Promise<Book> {
  return null;
}
