import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'app/containers/app';
import client from 'app/graph/client';

import 'flexboxgrid/dist/flexboxgrid.min.css';

ReactDOM.render(
  <ApolloProvider client={ client }>
    <App />
  </ApolloProvider>,
  document.getElementById( 'root' ),
);
