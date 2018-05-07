import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import styled from 'styled-components';

import Card, { CardMedia } from 'material-ui/Card';

import { TOGGLE_BOOK_MUTATION } from 'app/graph/Book/mutations';
import { GET_OPEN_BOOK_QUERY } from 'app/graph/Book/queries';
import withQuery from 'app/graph/withQuery';
import { Book as BookType } from 'app/types';

interface ExternalProps {
  book: BookType;
}

export interface InjectedProps {
  open?: string;
  toggleBookMutation: ( { variables: { id: string } }: any ) => void;
  onOpen: ( event: React.SyntheticEvent<HTMLDivElement> ) => void;
}

type Props = ExternalProps & InjectedProps & RouteComponentProps<any>;

function ExpandedBook ( { loading, error, data: { book } }: QueryResult ) {
  if ( loading ) {
    return <div>Loading</div>;
  }

  if ( error ) {
    return <div>Error</div>;
  }

  return (
    <div>{ book.title }</div>
  );
}

function Book ( { book, open, onOpen, history, match }: Props ) {
  if ( match.params.bookId ) {
    return (
      <Query query={ GET_OPEN_BOOK_QUERY } variables={ { id: match.params.bookId } }>
        { result => ExpandedBook( result ) }
      </Query>
    );
  }

  return (
    <StyledCard 
      onClick={ onOpen }>
      {/* <StyledMedia
        image={ book.image }
        title={ book.title }/> */}
      { book.title }<br/>
      { book.author }
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
  withHandlers( {
    onOpen: ( { book, history }: Props ) =>
      ( event: React.SyntheticEvent<HTMLDivElement> ) =>
        history.push( `/book/${book.id}` ),
  } ),
)( Book );
