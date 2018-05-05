/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface initBooksMutation {
  initBooks:  Array< {
    id: string,
  } | null > | null,
};

export interface toggleBookMutationVariables {
  id: string,
};

export interface toggleBookMutation {
  toggleBook:  {
    id: string,
  } | null,
};

export interface GetBooksQuery {
  books:  Array< {
    id: string,
    title: string,
    author: string,
    image: string,
  } | null > | null,
};

export interface OpenBookQuery {
  open: string | null,
};

export interface GetOpenBookQueryVariables {
  id: string,
};

export interface GetOpenBookQuery {
  book:  {
    id: string,
    title: string,
    author: string,
    image: string,
    reviews:  Array< {
      id: string,
    } > | null,
    description: string,
    checked_out: string | null,
  } | null,
};

export interface openBookFragment {
  id: string,
  title: string,
  author: string,
  image: string,
  description: string,
  reviews:  Array< {
    id: string,
  } > | null,
  checked_out: string | null,
};
