import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Book from 'app/components/Book';
import { BookState, withBooks } from 'app/graph/stores/bookStore';
import { Book as BookType } from 'app/types';

interface Props extends BookState {
  initBookMutation: () => void;
  toggleBookMutation: () => void;
}

function Books ( { books, initBookMutation, toggleBookMutation }: Props ) {
  return (
    <Grid container spacing={ 16 }>
      {
        books.map( book => 
          <Grid item key={ book.id }
            xs={ 6 } sm={ 4 } md={ 3 }>
            <Book book={ book } onClick={ toggleBookMutation }/>
          </Grid>,
        )
      }
    </Grid>
  );
}

export default compose<Props, {}>(
  withBooks,
  lifecycle<Props, {}>( {
    componentDidMount () {
      this.props.initBookMutation();
    },
  } ),
)( Books );
