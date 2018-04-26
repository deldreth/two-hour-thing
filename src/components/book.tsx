import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { RootState } from 'app/reducers';
import { Book as BookType } from 'app/types';

export interface Props {
  book: BookType;
  open: boolean;
  onCheckout: () => void;
}

export default class Book extends React.Component<Props> {
  checkoutHandler = () => {
    this.props.onCheckout();
  }

  renderReviews () {
    if ( this.props.open ) {
      return this.props.book.reviews.map( review => (
        <Review>
          <div>{ review.rating }</div>
          <div>{ review.user }</div>
        </Review>
      ) );
    }
  }

  renderCheckedOut () {
    if ( this.props.book.checked_out ) {
      return (
        <React.Fragment>
          Checked Out: { this.props.book.checked_out }
        </React.Fragment>
      );
    }
  }

  renderCheckOut () {
    if ( this.props.open && !this.props.book.checked_out ) {
      return (
        <button
          onClick={ this.checkoutHandler }>
          Check Out
        </button>
      );
    }
  }

  render () {
    return (
      <BookCover
        open={ this.props.open }
        checked_out={ this.props.book.checked_out }>
        <div>{ this.props.book.id }</div>
        <div>{ this.props.book.author }</div>
        
        { this.renderCheckedOut() }
        { this.renderCheckOut() }
        { this.renderReviews() }
      </BookCover>
    );
  }
}

interface BookCoverProps {
  open: boolean;
  checked_out: string;
}
const BookCover = styled<BookCoverProps, 'div'>( 'div' )`
  position: ${ props => props.open ? 'fixed' : 'relative' };
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  display: flex;
  flex-direction: column;
  min-height: 75px;
  border: thin solid ${ props => props.checked_out ? 'black' : 'brown' };
  padding: 16px;
  z-index: ${ props => props.open ? 2 : 1 };
  background-color: #FFFFFF;
  opacity: ${ props => !props.open && props.checked_out ? 0.75 : 1 };
`;

const Review = styled.div`
  border: thin solid darkgreen;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  flex-direction: column;
`;
