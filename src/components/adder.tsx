import React, { TextareaHTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { createBook } from 'app/actions';
import { RootState } from 'app/reducers';
import { Book as BookType } from 'app/types';

import { Button } from 'app/components/shared';

export interface Props {
  create: typeof createBook;
}

export interface State {
  title: string;
  author: string;
  image: string;
  description: string;
}

export default class Book extends React.Component<Props, State> {
  constructor ( props: Props ) {
    super( props );

    this.state = {
      title: '',
      author: '',
      image: '',
      description: '',
    };
  }

  createHandler = ( event: React.SyntheticEvent<HTMLButtonElement> ) => {
    this.props.create( {
      id: this.state.title.toLowerCase().replace( ' ', '_' ),
      title: this.state.title,
      author: this.state.author,
      image: this.state.image,
      description: this.state.description,
      checked_out: null,
      reviews: [],
    } );

    this.setState( {
      title: '',
      author: '',
      image: '',
      description: '',
    } );
  }

  render () {
    return (
      <AdderContainer>
        <Input>
          Title:
          <input type="text"
            value={ this.state.title }
            onChange={ ( event: React.ChangeEvent<HTMLInputElement> ) =>
              this.setState( { title: event.target.value } ) } />
        </Input>

        <Input>
          Author:
          <input type="text"
            value={ this.state.author }
            onChange={ ( event: React.ChangeEvent<HTMLInputElement> ) =>
              this.setState( { author: event.target.value } ) } />
        </Input>

        <Input>
          Image (url):
          <input type="text"
            value={ this.state.image }
            onChange={ ( event: React.ChangeEvent<HTMLInputElement> ) =>
              this.setState( { image: event.target.value } ) } />
        </Input>

        <Input>
          Description:
          <textarea
            value={ this.state.description }
            onChange={ ( event: React.ChangeEvent<HTMLTextAreaElement> ) =>
              this.setState( { description: event.target.value } ) } />
        </Input>

        <Button
          onClick={ this.createHandler }>
          Create Book
        </Button>
      </AdderContainer>
    );
  }
}

const AdderContainer = styled.div`
  display: flex;
  flex-direction: column;

  border-top: thin solid black;
  padding-top: 16px;

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

const Input = styled.label`
  display: flex;
  flex-direction: column;

  @media ( min-width: 356px ) {
    max-width: 100%;
  }

  @media ( min-width: 512px ) {
    max-width: 50%;
  }

  margin-bottom: 16px;

  input,
  textarea {
    margin-top: 8px;
  }
`;
