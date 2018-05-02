import gql from 'graphql-tag';
import React from 'react';
import { compose, lifecycle } from 'recompose';
import styled from 'styled-components';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Book from 'app/components/book';
import BookStore from 'app/graph/stores/bookStore';
import { Book as BookType } from 'app/types';

interface Props {
  books: BookType[];
  initBookMutation: () => void;
  toggleBookMutation: () => void;
}

const lifecycles = lifecycle<Props, {}>( {
  componentDidMount () {
    this.props.initBookMutation();
  },
} );

function Books ( { books, toggleBookMutation, initBookMutation }: any ) {
  if ( books ) {
    return books.map( ( book: BookType ) => 
      <Book key={ book.id }
        { ...book }
        onOpen={ toggleBookMutation }/>,
    );
  }

  return <div>No Books Here</div>;
}

export default compose(
  BookStore.withBooks,
  lifecycles,
)( Books );
