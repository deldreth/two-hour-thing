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

function ModalBook () {
  return (
    <div/>
    // <Modal
    //   open={ !!open_book }
    //   onBackdropClick={ mutate }
    //   style={ styles }>
    //   <Query query={ GetOpenBook } variables={{ id: open_book }}>
    //     { ( { data } ) => {
    //       if ( data.Book ) {
    //         return <Book renderFull { ...data.Book }/>;
    //       }

    //       return null;
    //      } }
    //   </Query>
    // </Modal>
  );
}

export default ModalBook;

// export default compose(
//   graphql( QueryOpenBook ),
//   graphql( MutationCloseBook ),
// )( ModalBook );
