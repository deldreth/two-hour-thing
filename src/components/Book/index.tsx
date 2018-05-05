import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import styled from 'styled-components';

import Card, { CardMedia } from 'material-ui/Card';

import { Book as BookType } from 'app/types';

interface ExternalProps {
}

export interface InjectedProps {
  book: BookType;
  onClick: ( data: any ) => void;
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

function Book ( { book, onClick, history, match }: Props ) {
  return (
    <StyledCard 
      onClick={ () => onClick( { variables: { id: book.id } } ) }>
      <StyledMedia
        image={ book.image }
        title={ book.title }/>

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

export default compose<{}, InjectedProps>(
  withRouter,
)( Book );
