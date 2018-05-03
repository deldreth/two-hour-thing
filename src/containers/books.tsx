import gql from 'graphql-tag';
import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

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

function Books ( { books, toggleBookMutation, initBookMutation }: Props ) {
  if ( books ) {
    return (
      <Grid container spacing={ 16 }>
        {
          books.map( ( book: BookType ) => 
            <Grid item key={ book.id }
              xs={ 12 } sm={ 6 } md={ 4 }>
              <Book { ...book } onOpen={ toggleBookMutation }/>
            </Grid>,
          )
        }
      </Grid>
    );
  }

  return <div>No Books Here</div>;
}

export default compose<Props, {}>(
  BookStore.withBooks,
  lifecycles,
)( Books );
