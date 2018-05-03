import React from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export default function Header () {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="title" color="inherit">
          The Number of Books Here is Quite High
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
