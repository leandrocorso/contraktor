import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const btnContracts = React.forwardRef((props, ref) => (
  <NavLink activeClassName="active" innerRef={ref} to="/contratos" {...props} />
));

const btnParts = React.forwardRef((props, ref) => (
  <NavLink activeClassName="active" innerRef={ref} to="/partes" {...props} />
));

function Home() {
  return (
    <>
      <h1>Início</h1>

      <p>Selecione uma opção</p>
      <p>
        <Button component={btnContracts} color="primary" size="large" variant="contained">
          Contratos
        </Button>
      </p>

      <p>
        <Button component={btnParts} color="primary" size="large" variant="contained">
          Partes
        </Button>
      </p>
    </>
  );
}

export default Home;
