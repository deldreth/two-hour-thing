import { hot } from 'react-hot-loader';

import gql from 'graphql-tag';
import React from 'react';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';
import styled, { ThemeProvider } from 'styled-components';

import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Modal from 'material-ui/Modal';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import Books from 'app/containers/books';
import ModalAdd from 'app/containers/modalAdd';
import ModalBook from 'app/containers/modalBook';

import AddCard from 'app/components/addCard';

const theme = createMuiTheme();

function App () {
  return (
    <MuiThemeProvider theme={ theme }>
      <ThemeProvider theme={ theme }>
        <AppContainer>
          <CssBaseline/>

          <Grid container spacing={ 16 }>
            <Books />
            <AddCard />
          </Grid>

          <ModalBook />
        </AppContainer>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;

const AppContainer = styled.div`
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
  width: 90vw;

  @media only screen and (min-width : ${ props => props.theme.breakpoints.values.sm }px ) {
    width: 80vw;
  }

  @media only screen and (min-width : ${ props => props.theme.breakpoints.values.md }px ) {
    width: 70vw;
  }
`;
