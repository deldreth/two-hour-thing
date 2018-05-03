import React from 'react';
import styled from 'styled-components';

import Card, { CardMedia } from 'material-ui/Card';

import { Book as BookType } from 'app/types';

interface Props extends BookType {
  onClick: ( data: any ) => void;
}

function Book ( { id, title, author, 
                  image, reviews, 
                  description, onClick }: Props ) {
  return (
    <StyledCard 
      onClick={ () => onClick( { variables: { id } } ) }>
      <StyledMedia
        image={ image }
        title={ title }/>
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

export default Book;
