import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './views/Home/';
import { Menu } from './components/Menu';
import { ListarCliente } from './views/Cliente/ListarClientes/';
import { InserirCliente } from './views/Cliente/InserirCliente';
import { ListarServico } from './views/Servico/ListarServicos/';
import { PedidoServico } from './views/Servico/PedidosServico';
import { InserirServico } from './views/Servico/InserirServico';
import { ListarPedidos } from './views/Pedido/ListarPedidos';
import { InserirPedido } from './views/Pedido/InserirPedido';
import { ListarCompras } from './views/Compra/ListarCompras';
import { InserirCompra } from './views/Compra/InserirCompra';
import { ListarProduto } from './views/Produto/ListarProduto';
import { InserirProduto } from './views/Produto/InserirProduto';
import { CompraProduto } from './views/Produto/CompraProduto';

function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/listar-cliente" component={ListarCliente}/>
          <Route path = "/inserir-cliente" component = {InserirCliente}/>
          <Route path="/listar-servico" component={ListarServico}/>
          <Route path="/inserir-servico" component={InserirServico}/>
          <Route path="/listar-pedido/:id" component={PedidoServico}/>
          <Route path="/listar-pedido" component={ListarPedidos}/>
          <Route path="/inserir-pedido" component={InserirPedido}/>
          <Route path="/listar-compra/:id" component={CompraProduto}/>
          <Route path="/listar-compra" component={ListarCompras}/>
          <Route path="/inserir-compra" component={InserirCompra}/>
          <Route path="/listar-produto" component={ListarProduto}/>
          <Route path="/inserir-produto" component={InserirProduto}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
