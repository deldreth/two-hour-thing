import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';

import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';
import Modal from 'material-ui/Modal';

import Books from 'app/containers/books';

import ModalBook from 'app/containers/modalBook';

export interface Props {
  loaded: boolean;
}

export default class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <CssBaseline/>

        <Grid container spacing={ 8 }>
          <Books />
        </Grid>

        <ModalBook />
      </React.Fragment>
    );
  }
}
