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
        <div className="row">
          <Books />
        </div>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;

  padding-top: 32px;
  
  @media ( min-width: 512px ) {
    max-width: 100%;
    padding-left: 32px;
    padding-right: 32px;
  }

  @media ( min-width: 768px ) {
    max-width: 1024px;
  }
`;

export default hot( module )(
  connect(
    ( state: RootState ): Props => ( {
      loaded: state.app.loaded,
    } ),
    ( dispatch: Dispatch<RootState> ): typeof Creators => bindActionCreators( Creators, dispatch ),
  )( App ),
);
