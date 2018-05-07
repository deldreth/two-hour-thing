import { hot } from 'react-hot-loader';

import gql from 'graphql-tag';
import React from 'react';
import { graphql } from 'react-apollo';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import styled, { ThemeProvider } from 'styled-components';

import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Modal from 'material-ui/Modal';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import Book from 'app/Book';
import Header from 'app/components/layout/header';
import Library from 'app/Library';

const theme = createMuiTheme();

function App () {
  return (
    <MuiThemeProvider theme={ theme }>
      <ThemeProvider theme={ theme }>
        <AppContainer>
          <CssBaseline/>
          
          <Header />

          <RouteContainer>
            <Route exact path="/" component={ Library }/>
            <Route path="/book/:bookId" component={ Book }/>
          </RouteContainer>

        </AppContainer>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default hot( module )( App );

const AppContainer = styled.div`
  margin: 16px;

  @media only screen and (min-width : ${ props => props.theme.breakpoints.values.sm }px ) {
    margin: 16px auto;
    max-width: ${ props => props.theme.breakpoints.values.sm }px;
  }

  @media only screen and (min-width : ${ props => props.theme.breakpoints.values.md }px ) {
    max-width: ${ props => props.theme.breakpoints.values.md }px;
  }
`;

const RouteContainer = styled.div`
  margin-top: 72px;

  @media only screen and (min-width : ${ props => props.theme.breakpoints.values.sm }px ) {
    margin-top: 82px;
  }
`;
