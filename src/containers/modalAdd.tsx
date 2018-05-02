import gql from 'graphql-tag';
import React from 'react';
import { compose, graphql, Mutation, Query } from 'react-apollo';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Modal from 'material-ui/Modal';
import TextField from 'material-ui/TextField';

import Book from 'app/components/book';

const styles = {
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '50vw',
  },
};

function ModalBook ( { data, mutate } ) {
  return (
    <Modal
      open={ data.addingBook }
      onBackdropClick={ mutate }
      style={ styles.modal }>
      <Card style={ styles.card }>
        <CardContent>
          <TextField fullWidth label="Title"/>
          <TextField fullWidth label="Author"/>
          <TextField fullWidth
            label="Description"
            multiline
            rows={ 2 }
            rowsMax={ 4 }/>
        </CardContent>
      </Card>
    </Modal>
  );
}

const MutationCloseModal = gql`
  mutation AddingBook {
    addingBook @client
  }
`;

const QueryAddingBook = gql`
  {
    addingBook @client
  }
`;

export default compose(
  graphql( QueryAddingBook ),
  graphql( MutationCloseModal ),
)( ModalBook );
