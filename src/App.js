import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './views/Home/';
import { Menu } from './components/Menu';
import { ListarCliente } from './views/Cliente/ListarClientes/';
import { InserirCliente } from './views/Cliente/InserirCliente';
import { EditarCliente } from './views/Cliente/EditarCliente';
import { ListarServico } from './views/Servico/ListarServicos/';
import { PedidoServico } from './views/Servico/PedidosServico';
import { InserirServico } from './views/Servico/InserirServico';
import { EditarServico } from './views/Servico/EditarServico';
import { ListarItemPedido } from './views/ItemPedido/ListarItemPedido';
import { EditarItemPedido } from './views/ItemPedido/EditarItemPedido';
import { InserirItemPedido } from './views/ItemPedido/InserirItemPedido';
import { ListarPedidos } from './views/Pedido/ListarPedidos';
import { InserirPedido } from './views/Pedido/InserirPedido';
import { EditarPedido } from './views/Pedido/EditarPedido';
import { ListarCompras } from './views/Compra/ListarCompras';
import { InserirCompra } from './views/Compra/InserirCompra';
import { EditarCompra } from './views/Compra/EditarCompra';
import { ListarItemCompra } from './views/ItemCompra/ListarItemCompra';
import { EditarItemCompra } from './views/ItemCompra/EditarItemCompra';
import { InserirItemCompra } from './views/ItemCompra/InserirItemCompra';
import { ListarProduto } from './views/Produto/ListarProduto';
import { InserirProduto } from './views/Produto/InserirProduto';
import { CompraProduto } from './views/Produto/CompraProduto';
import { EditarProduto } from './views/Produto/EditarProduto';

function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/listar-cliente" component={ListarCliente}/>
          <Route path ="/inserir-cliente" component={InserirCliente}/>
          <Route path="/editar-cliente/:id" component={EditarCliente}/>
          <Route path="/listar-servico" component={ListarServico}/>
          <Route path="/inserir-servico" component={InserirServico}/>
          <Route path="/listar-pedido/:id" component={PedidoServico}/>
          <Route path="/editar-servico/:id" component={EditarServico}/>
          <Route path="/listar-itempedido" component={ListarItemPedido}/>
          <Route path="/editar-itempedido/:id" component={EditarItemPedido}/>
          <Route path="/inserir-itempedido" component={InserirItemPedido}/>
          <Route path="/listar-pedido" component={ListarPedidos}/>
          <Route path="/inserir-pedido" component={InserirPedido}/>
          <Route path="/editar-pedido/:id" component={EditarPedido}/>
          <Route path="/listar-compra/:id" component={CompraProduto}/>
          <Route path="/listar-compra" component={ListarCompras}/>
          <Route path="/inserir-compra" component={InserirCompra}/>
          <Route path="/editar-compra/:id" component={EditarCompra}/>
          <Route path="/listar-itemcompra" component={ListarItemCompra}/>
          <Route path="/editar-itemcompra/:id" component={EditarItemCompra}/>
          <Route path="/inserir-itemcompra" component={InserirItemCompra}/>
          <Route path="/listar-produto" component={ListarProduto}/>
          <Route path="/inserir-produto" component={InserirProduto}/>
          <Route path="/editar-produto/:id" component={EditarProduto}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
