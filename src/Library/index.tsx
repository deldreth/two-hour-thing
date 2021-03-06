import gql from 'graphql-tag';
import React from 'react';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Book from 'app/Book';
import { INIT_BOOKS_MUTATION } from 'app/graph/Book/mutations';
import { BOOK_QUERY } from 'app/graph/Book/queries';
import { GetBooksQuery } from 'app/graph/types';
import withMutation from 'app/graph/withMutation';
import withQuery from 'app/graph/withQuery';
import { Book as BookType } from 'app/types';

interface ExternalProps {

}

export interface InjectedProps {
  books: BookType[];
  initBookMutation: () => void;
}

type Props = ExternalProps & InjectedProps;

function Books ( props: Props ) {
  return (
    <Grid container spacing={ 16 }>
      {
        props.books.map( book => 
          <Grid item key={ book.id }
            xs={ 6 } sm={ 4 } md={ 3 }>
            <Book book={ book }/>
          </Grid>,
        )
      }
    </Grid>
  );
}

export default compose<InjectedProps, ExternalProps>(
  withQuery( BOOK_QUERY ),
  withMutation( INIT_BOOKS_MUTATION, 'initBookMutation' ),
  lifecycle<Props, {}>( {
    componentDidMount () {
      this.props.initBookMutation();
    },
  } ),
)( Books );
