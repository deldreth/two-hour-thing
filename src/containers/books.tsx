import gql from 'graphql-tag';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import Book from 'app/components/book';
import BookStore from 'app/graph/stores/bookStore';
import { Book as BookType } from 'app/types';

const execMethods = lifecycle( {
  componentDidMount () {
    this.props.initBookMutation();
  },
} );

function Books ( { books, toggleBookMutation }: any ) {
  if ( books ) {
    return books.map( ( book: BookType ) => 
      <Book key={ book.id }
        { ...book }
        onOpen={ toggleBookMutation }/>,
    );
  }

  return <div>Nothing</div>;
}

const BooksComposed = compose(
  BookStore.withBooks,
  execMethods,
)( Books );

export default ( BooksComposed );
