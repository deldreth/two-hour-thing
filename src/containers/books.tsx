import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { Creators } from 'app/actions';
import Book from 'app/components/book';
import { RootState } from 'app/reducers';
import { Book as BookType } from 'app/types';

export interface Props {
  books: BookType[];
  open_book?: string;
}

class Books extends React.Component<Props & typeof Creators> {
  render () {
    return this.props.books.map( book => (
      <BookShelf
        key={ book.id }
        onClick={ ( event: React.SyntheticEvent<HTMLDivElement | HTMLButtonElement> ) => {
          if ( event.target instanceof HTMLButtonElement === false ) {
            if ( book.id === this.props.open_book ) {
              this.props.openBook( null );
            } else {
              this.props.openBook( book.id );
            }
          }
        } }>
        <Book
          book={ book }
          open={ book.id === this.props.open_book }
          onCheckout={ this.props.checkoutBook }
          onReturn={ this.props.returnBook }/>
      </BookShelf>
    ) );
  }
}

const BookShelf = styled.div.attrs( {
  className: 'col-xs-12 col-sm-6 col-md-4',
} )`
  margin-bottom: 16px;
`;

const BookCover = styled.div`
  display: flex;
  flex-direction: column;
  border: thin solid brown;
  padding: 16px;
`;

const ButtonCheckout = styled.div`

`;

export default connect(
  ( state: RootState ): Props => ( {
    books: state.app.books,
    open_book: state.app.open_book,
  } ),
  ( dispatch: Dispatch<RootState> ): typeof Creators => bindActionCreators( Creators, dispatch ),
)( Books );
