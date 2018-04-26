import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { RootState } from 'app/reducers';
import { Book as BookType } from 'app/types';

export interface Props {
  book: BookType;
  open: boolean;
}

export interface State {
  open: boolean;
  animating: boolean;
}

export default class Book extends React.Component<Props, State> {
  constructor ( props: Props ) {
    super( props );

    this.state = {
      open: false,
      animating: false,
    };
  }

  // componentDidUpdate ( prevProps: Props ) {
  //   if ( this.props.open !== prevProps.open ) {
  //     this.setState( { animating: true }, () => {
  //       window.requestAnimationFrame( () => {
  //         this.setState( { open: this.props.open }, () => {
  //           window.setTimeout( () => { this.setState( { animating: false } ); }, 2000 );
  //         } );
  //       } );
  //     } );
  //   }
  // }

  render () {
    return (
      <BookCover open={ this.props.open }>
        <span>{ this.props.book.id }</span>
        <span>{ this.props.book.author }</span>
      </BookCover>
    );
  }
}

interface BookCoverProps {
  open: boolean;
}
const BookCover = styled<BookCoverProps, 'div'>( 'div' )`
  position: ${ props => props.open ? 'fixed' : 'relative' };
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  transition: left 2s ease-in;
  transition: top 2s ease-in;
  transition: right 2s ease-in;
  transition: bottom 2s ease-in;

  display: flex;
  flex-direction: column;
  border: thin solid brown;
  padding: 16px;
  z-index: ${ props => props.open ? 2 : 1 };
  background-color: #FFFFFF;
`;
