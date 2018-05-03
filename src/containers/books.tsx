import gql from 'graphql-tag';
import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Book from 'app/components/book';
import BookStore, { BookState } from 'app/graph/stores/bookStore';
import { Book as BookType } from 'app/types';

interface Props extends BookState {
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
              xs={ 6 } sm={ 4 } md={ 3 }>
              <Book { ...book } onClick={ toggleBookMutation }/>
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
