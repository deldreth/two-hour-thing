import gql from 'graphql-tag';
import React from 'react';
import { compose, graphql, Mutation, Query } from 'react-apollo';

import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';

import Book from 'app/components/book';
import BookStore from 'app/graph/stores/bookStore';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function ModalBook ( { open, toggleBookMutation } ) {
  return (
    <Modal
      open={ ( open ) ? true : false }
      onBackdropClick={ toggleBookMutation }
      style={ styles }>
      <Query query={ GET_OPEN_BOOK } variables={{ id: open }}>
        { ( { data } ) => {
          if ( data.book ) {
            return <Book renderFull { ...data.book }/>;
          }

          return null;
         } }
      </Query>
    </Modal>
  );
}

const GET_OPEN_BOOK = gql`
  query GetOpenBook($id: ID!) {
    book(id: $id) @client {
      id,
      title,
      author,
      image,
      reviews,
      description,
      checked_out
    }
  }
`;

export default compose(
  BookStore.withBooks,
)( ModalBook );
