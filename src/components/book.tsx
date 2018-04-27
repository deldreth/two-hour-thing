import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { checkoutBook, returnBook } from 'app/actions';
import { RootState } from 'app/reducers';
import { Book as BookType } from 'app/types';

export interface Props {
  book: BookType;
  open: boolean;
  onCheckout: typeof checkoutBook;
  onReturn: typeof returnBook;
}

export default class Book extends React.Component<Props> {
  checkoutHandler = () => {
    this.props.onCheckout( 'kent_dodds', this.props.book.id );
  }

  returnHandler = () => {
    this.props.onReturn( this.props.book.id );
  }

  renderClose () {
    if ( this.props.open ) {
      return (
        <Close>X</Close>
      );
    }
  }

  renderReviews () {
    if ( this.props.open ) {
      return this.props.book.reviews.map( ( review, index ) => (
        <Review key={ index }>
          <div>{ review.rating }</div>
          <div>{ review.user }</div>
        </Review>
      ) );
    }
  }

  renderCheckedOut () {
    if ( this.props.open && this.props.book.checked_out ) {
      return (
        <React.Fragment>
          Checked Out: { this.props.book.checked_out }
        </React.Fragment>
      );
    }
  }

  renderReturnCheckout () {
    if ( this.props.open ) {
      if ( !this.props.book.checked_out ) {
        return (
          <button
            onClick={ this.checkoutHandler }>
            Check Out
          </button>
        );
      }

      return (
        <button
          onClick={ this.returnHandler }>
          Return
        </button>
      );
    }
  }

  render () {
    return (
      <BookCover
        open={ this.props.open }
        checked_out={ this.props.book.checked_out }>
        { this.renderClose() }

        <img src={ this.props.book.image }/>

        <div>{ this.props.book.title }</div>
        <div>{ this.props.book.author }</div>
        
        { this.renderCheckedOut() }
        { this.renderReturnCheckout() }
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

  img {
    max-width: 150px;
    margin-left: auto;
    margin-right: auto;
  }

  &:hover {
    cursor: ${ props => !props.open ? 'pointer' : 'cursor' };
  }

  button {
    max-width: 200px;
    height: 44px;
    appearance: none;
    border: thin solid #CCCCCC;
    margin-top: 16px;
    margin-bottom: 12px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Review = styled.div`
  border: thin solid darkgreen;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  flex-direction: column;
`;

const Close = styled.div`
  position: absolute;
  right: 16px;

  font-size: 24px;
  &:hover {
    cursor: pointer;
  }
`;
