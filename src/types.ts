export interface User {
  id: string;
  name: string;
  avatarURL: string;
  reviews: Review[];
  checked_out: string;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  book: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  checked_out: string;
  reviews: Review[];
  description: string;
}

import { InMemoryCache } from 'apollo-cache-inmemory';
export interface StateCache {
  cache: InMemoryCache;
}
