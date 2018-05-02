import gql from 'graphql-tag';
import React from 'react';
import { graphql } from 'react-apollo';

import AddIcon from 'material-ui/';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

const styles = {
  div: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function AddCard ( { mutate } ) {
  return (
    <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
      <div style={ styles.div }>
        <Button variant="fab" color="primary" aria-label="add"
          onClick={ mutate }>
          <Icon>add_icon</Icon>
        </Button>
      </div>
    </Grid>
  );
}

export default graphql( gql`
  mutation AddBook( $value: Boolean! ) {
    addingBook( value: $value ) @client
  }
` )( AddCard );
