import { DocumentNode } from 'graphql';
import React from 'react';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';

export default <TPropsExternal, TPropsInjected>( query: DocumentNode ) => 
  ( Component: React.ComponentType ) => 
    ( props: TPropsExternal & TPropsInjected ) => {
      const ComponentWithProps = compose(
        graphql( query, {
          props: ( { ownProps, data } ) => ( {
            ...ownProps,
            ...data,
          } ),
        } ),
      )( Component );

      return <ComponentWithProps { ...props } />;
};
