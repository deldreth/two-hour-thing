import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { Book as BookType, Review } from 'app/types';

function Ratings ( reviews: Review[] ) {
  let sum = 0;
  reviews.forEach( review => sum += review.rating );

  return sum / reviews.length;
}

interface Props extends BookType {
  renderFull?: boolean;
  onOpen: ( data: any ) => void;
}

const styles = {
  renderFull: {
    card: {
      width: '80vw',
      height: '80vh',
    },
    media: {
      height: 250,
    },
  },
  default: {
    card: {
      height: 300,
    },
    media: {
      height: 150,
    },
  },
};

function BookCard ( { renderFull, id, title, author, image, reviews, description, onOpen }: Props ) {
  let RenderFull = null;
  if ( renderFull ) {
    RenderFull = () => (
      <React.Fragment>
        <Typography paragraph variant="body2">
          Average Rating: { Ratings( reviews ) }
        </Typography>
        <Typography paragraph>
          { description }
        </Typography>
      </React.Fragment>
    );
  }

  const renderStyles = styles[ renderFull ? 'renderFull' : 'default' ];

  return (
    <Card style={ renderStyles.card }>
      <CardMedia style={ renderStyles.media }
        image={ image }
        title={ title }/>
      <CardContent>
        <Typography variant="headline"
          component="h5"
          noWrap>
          { title }
        </Typography>
        
        <Typography component="p">
          by { author }
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={ () => onOpen( {variables: { id } } ) } color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default function ( book: Props ) {
  if ( book.renderFull ) {
    return <BookCard { ...book }/>;
  }

  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
      <BookCard { ...book }/>  
    </Grid>
  );
}
