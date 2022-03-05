import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './views/Home/';
import { Menu } from './components/Menu';
import { ListarCliente } from './views/Cliente/ListarClientes/';
import { ListarPedido } from './views/Pedido/ListarPedidos/';
import { ListarServico } from './views/Servico/ListarServicos/';
import { Item } from './views/Servico/item/';

function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/listar-cliente" component={ListarCliente}/>
          <Route path="/listar-pedido" component={ListarPedido}/>
          <Route path="/listar-servico" component={ListarServico}/>
          <Route path="/listar-pedido/:id" component={Item}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
