import gql from 'graphql-tag';

const typeDefs = `
  type User {
    id: ID!
    name: String!
    avatarURL: String
    reviews: [Review!]
    checked_out: String
  }

  type Review {
    id: ID!;
    user: User!;
    rating: Int;
    book: Book!;
  }

  type Book {
    id: String!
    title: String!
    author: String!
    image: String!
    checked_out: String
    reviews: [Review!]
    description: String!
  }

  type Query {
    book(id: ID!): Book
  }

  type Mutation {
    initBooks: [Book]
    toggleBook(id: ID!): Book
  }
`;

export default typeDefs;
