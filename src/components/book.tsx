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

const styles = {
  card: {
    height: 300,
  },
  media: {
    height: 150,
  },
};

const OpenBook = gql`
  mutation OpenBook($id: String!) {
    openBook(id: $id) @client
  }
`;

function BookActions ( id: string ) {
  return (
    <CardActions>
      <Mutation mutation={ OpenBook } variables={{ id }}>
        { openBook => (
          <Button onClick={ () => openBook() } color="primary">
            View
          </Button>
        ) }
      </Mutation>
    </CardActions>
  );
}

function Ratings ( reviews: Review[] ) {
  let sum = 0;
  reviews.forEach( review => sum += review.rating );

  return sum / reviews.length;
}

interface Props extends BookType {
  renderFull?: boolean;
}

export default function ( { renderFull, id, image, title, author, reviews, description }: Props ) {
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
  } else {
    RenderFull = () => (
      <React.Fragment>
        { BookActions( id ) }

      </React.Fragment>
    );
  }

  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
      <Card
        style={ styles.card }>
        <CardMedia
          style={ styles.media }
          image={ image }
          title={ title }/>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h5" noWrap>
            { title }
          </Typography>
          
          <Typography component="p">
            by { author }
          </Typography>
        </CardContent>

        <RenderFull />
      </Card>
    </Grid>
  );
}

export function BookRenderFull ( { id, image, title, author, reviews, description }: Props ) {

}