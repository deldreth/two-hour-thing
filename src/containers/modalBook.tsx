import gql from 'graphql-tag';
import React from 'react';
import { compose, graphql, Mutation, Query } from 'react-apollo';

import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';

import Book from 'app/components/Book';
import { GET_OPEN_BOOK_QUERY } from 'app/components/Book/queries';
import { withBooks } from 'app/graph/stores/bookStore';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function ModalBook ( { open, toggleBookMutation } ) {
  return (
    <Query query={ GET_OPEN_BOOK_QUERY } variables={{ id: open }}>
      { ( { data } ) => {
        if ( data.book ) {
          return (
            <Modal
              open={ ( open ) ? true : false }
              onBackdropClick={ toggleBookMutation }
              style={ styles }>
                <Book { ...data.book }/>
            </Modal>
          );
        }

        return null;
      } }
    </Query>
  );
}

export default compose(
  withBooks,
)( ModalBook );
