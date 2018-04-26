import { hot } from 'react-hot-loader';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { Creators } from 'app/actions';
import { RootState } from 'app/reducers';

import Books from 'app/containers/books';

export interface Props {
  loaded: boolean;
}

class App extends React.Component<Props & typeof Creators> {
  componentDidMount () {
    this.props.fetchAll();
  }

  render () {
    return (
      <AppWrapper>
        <BookContainer>
          <Books />
        </BookContainer>

        <BookAdder>
          Add Your Books Here
        </BookAdder>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;

  @media ( min-width: 356px ) {
    max-width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
  
  @media ( min-width: 512px ) {
    max-width: 100%;
    padding-left: 32px;
    padding-right: 32px;
  }

  @media ( min-width: 768px ) {
    max-width: 1024px;
  }
`;

const BookContainer = styled.div.attrs( {
   className: 'row',
} )`
  height: 80vh;
  overflow-y: auto;
`;

const BookAdder = styled.div.attrs( {
  className: 'row',
} )`
  border-top: thin solid black;
  height: 20vh;
  padding: 16px;
`;

export default hot( module )(
  connect(
    ( state: RootState ): Props => ( {
      loaded: state.app.loaded,
    } ),
    ( dispatch: Dispatch<RootState> ): typeof Creators => bindActionCreators( Creators, dispatch ),
  )( App ),
);
