import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import styled from 'styled-components';

import Card, { CardMedia } from 'material-ui/Card';

import { TOGGLE_BOOK_MUTATION } from 'app/graph/Book/mutations';
import { OPEN_BOOK_QUERY } from 'app/graph/Book/queries';
import withMutation from 'app/graph/withMutation';
import withQuery from 'app/graph/withQuery';
import { Book as BookType } from 'app/types';

interface ExternalProps {
  book: BookType;
}

export interface InjectedProps {
  open?: string;
  toggleBookMutation: ( { variables: { id: string } }: any ) => void;
}

type Props = ExternalProps & InjectedProps & RouteComponentProps<any>;

function ExpandedBook ( expanded: boolean, book: BookType ) {
  if ( expanded ) {
    return (
      <div>
        { book.description }
      </div>
    );
  }
}

function Book ( { book, toggleBookMutation, history, match }: Props ) {
  return (
    <StyledCard 
      onClick={ () => toggleBookMutation( { variables: { id: book.id } } ) }>
      {/* <StyledMedia
        image={ book.image }
        title={ book.title }/> */}
      { book.title }<br/>
      { book.author }

      { ExpandedBook( match.params.bookId === book.id, book ) }
    </StyledCard>
  );
}

const StyledCard = styled( Card )`
  height: 300px;
  &:hover {
    cursor: pointer;
  }

  @media only screen and (min-width: ${ props => props.theme.breakpoints.values.sm }px ) {
    height: 350px;
  }
`;

const StyledMedia = styled( CardMedia )`
  height: 100%;
`;

export default compose<InjectedProps, ExternalProps>(
  withRouter,
  withQuery( OPEN_BOOK_QUERY ),
  withMutation( TOGGLE_BOOK_MUTATION, 'toggleBookMutation' ),
)( Book );
