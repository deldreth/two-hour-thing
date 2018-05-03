import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import compose from 'recompose/compose';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { Book as BookType, Review } from 'app/types';

interface ComposedProps extends BookType {
  classes: any;
}

interface OuterProps {
  renderFull?: boolean;
  onOpen: ( data: any ) => void;
}

const styles = ( theme ) => ( {
  card: {
    height: '300px',
  },
  media: {
    height: '150px',
  },
} );

function Book ( { classes, renderFull, id, title, author, 
                  image, reviews, description, onOpen }: ComposedProps & OuterProps ) {
  return (
    <Card className={ classes.card }
      onClick={ () => onOpen( {variables: { id } } ) }>
      <CardMedia
        className={ classes.media }
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
    </Card>
  );
}

export default compose<ComposedProps, OuterProps>(
  withStyles( styles, { withTheme: true } ),
)( Book );
