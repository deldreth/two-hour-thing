// import gql from 'graphql-tag';
// import React from 'react';
// import { graphql } from 'react-apollo';
// import compose from 'recompose/compose';

// import AddIcon from 'material-ui/';
// import Button from 'material-ui/Button';
// import Grid from 'material-ui/Grid';
// import Icon from 'material-ui/Icon';
// import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';

// interface Styles {
//   [ key: string ]: React.CSSProperties;
// }

// const styles = ( theme ): Styles => ( {
//   fab: {
//     position: 'fixed',
//     bottom: theme.spacing.unit * 2,
//     right: theme.spacing.unit * 2,
//   },
// } );

// function AddCard ( { classes, mutate } ) {
//   return (
//     <Button variant="fab" color="primary"
//       aria-label="add"
//       className={ classes.fab }
//       onClick={ mutate }>
//       <Icon>add_icon</Icon>
//     </Button>
//   );
// }

// export default compose(
//   withStyles( styles as any, { withTheme: true } ),
//   graphql( gql`
//   mutation AddBook( $value: Boolean! ) {
//     addingBook( value: $value ) @client
//   }
// ` ),
// )( AddCard as any );
