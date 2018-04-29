import gql from 'graphql-tag';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import React from 'react';
import { graphql, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import Book from 'app/components/book';
import { Book as BookType } from 'app/types';

function Books ( { data, client }: any ) {
  if ( data.allBooks && data.allBooks.length > 0 ) {
    return data.allBooks.map( ( book: BookType ) =>
      <Book key={ book.id } { ...book }/> );
  }

  return null;
}

export default graphql( gql`
  {
    allBooks {
      id
      title
      author
      image
    }
  }
` )( Books );
