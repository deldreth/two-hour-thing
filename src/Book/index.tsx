import React from 'react';
import { graphql } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import styled from 'styled-components';

import Card, { CardMedia } from 'material-ui/Card';

import { toggleBookMutation } from 'app/graph/Book/mutations';
import { OPEN_BOOK_QUERY } from 'app/graph/Book/queries';
import { OpenBookQuery } from 'app/graph/types';
import { Book as BookType } from 'app/types';

interface ExternalProps {
  book: BookType;
}

export interface InjectedProps {
  open?: string;
  toggleBookMutation: ( {}: any ) => void;
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
      { book.title }

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
  graphql<{}, OpenBookQuery, {}, {}>( OPEN_BOOK_QUERY, {
    props: ( { ownProps, data } ) => ( {
      ...ownProps,
      open: data.open,
    } ),
  } ),
  graphql( toggleBookMutation, { name: 'toggleBookMutation' } ),
)( Book );
