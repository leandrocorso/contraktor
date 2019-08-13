import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Material UI

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Toolbar, Typography,
} from '@material-ui/core';

// Constants

import { APP_NAME } from '../utils/constants';

// Styles

const useStyles = makeStyles(theme => ({
  homelink: {
    textDecoration: 'none',
    color: '#fff',
    flexGrow: 1,
  },
  button: {
    color: 'rgba(255, 255, 255, .4)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .04)',
    },

    '&.active': {
      color: 'white',

      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .08)',
      },
    },
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(10),
  },
}));

// Button links

const btnContracts = React.forwardRef((props, ref) => (
  <NavLink activeClassName="active" innerRef={ref} to="/contratos" {...props} />
));

const btnParts = React.forwardRef((props, ref) => (
  <NavLink activeClassName="active" innerRef={ref} to="/partes" {...props} />
));

// Render template

function Template({ children }) {
  const classes = useStyles();

  return (
    <CssBaseline>
      <AppBar position="fixed">
        <Toolbar>
          <NavLink activeClassName="active" to="/" className={classes.homelink}>
            <Typography variant="h6">{APP_NAME}</Typography>
          </NavLink>

          <nav>
            <Button className={classes.button} component={btnContracts}>
              Contratos
            </Button>
            <Button className={classes.button} component={btnParts}>
              Partes
            </Button>
          </nav>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>{children}</Container>
    </CssBaseline>
  );
}

Template.prototypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
