import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Template
import Template from './template';

// Routes
import Home from './containers/home';
import Contracts from './containers/contracts';
import ContractCreate from './containers/contracts/create';
import ContractEdit from './containers/contracts/edit';
import Parts from './containers/parts';
import PartCreate from './containers/parts/create';
import PartEdit from './containers/parts/edit';
import NotFound from './containers/notFound';

// Redux
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Template>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contratos" component={Contracts} />
            <Route exact path="/contratos/criar" component={ContractCreate} />
            <Route exact path="/contratos/:id" component={ContractEdit} />
            <Route exact path="/partes" component={Parts} />
            <Route exact path="/partes/criar" component={PartCreate} />
            <Route exact path="/partes/:id" component={PartEdit} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Template>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
