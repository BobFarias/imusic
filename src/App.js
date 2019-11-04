import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Index from './components/Index';

//Dentro do globalstate estamos exportando a class Provider
import { Provider } from './globalstate';

//Imprtamos o provider para encaminhar os states para os router e os componentes declarados. Forma simplificada da lógica do redux.
//Em seguida declaramos os router
function App() {
  return (
    <Provider>
      <Router>
        <React.Fragment>
        <Navbar/>
        <div className="container">
          <Switch>
            <Route exact path ='/' component={Index} />
          </Switch>
        </div>
        </React.Fragment>  
      </Router>
    </Provider>
  );
}

export default App;
