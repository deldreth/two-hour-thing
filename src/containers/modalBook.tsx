import gql from 'graphql-tag';
import React from 'react';
import { compose, graphql, Mutation, Query } from 'react-apollo';

import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';

import Book from 'app/components/book';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function ModalBook ( { data, mutate } ) {
  const { open_book } = data;
  return (
    <Modal
      open={ !!open_book }
      onBackdropClick={ mutate }
      style={ styles }>
      <Query query={ GetOpenBook } variables={{ id: open_book }}>
        { ( { data } ) => {
          if ( data.Book ) {
            return <Book renderFull { ...data.Book }/>;
          }

          return null;
         } }
      </Query>
    </Modal>
  );
}

const MutationCloseBook = gql`
  mutation CloseBook {
    closeBook @client
  }
`;

const QueryOpenBook = gql`
  {
    open_book @client
  }
`;

const GetOpenBook = gql`
  query Book($id: ID!) {
    Book(id: $id) {
      id
      title
      author
      reviews
      image
      description
    }
  }
`;

export default compose(
  graphql( QueryOpenBook ),
  graphql( MutationCloseBook ),
)( ModalBook );
