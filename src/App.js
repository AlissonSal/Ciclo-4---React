import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './views/Home/';
import { ListarCliente } from './views/Cliente/ListarClientes/';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/listar-cliente" component={ListarCliente}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
