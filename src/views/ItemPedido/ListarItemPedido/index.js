import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';
import { api } from '../../../config';

export const ListarItemPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItemPedido = async () => {
        axios.get(api + "/listaitenspedido")
            .then((response) => {
                console.log(response.data.itenspedido);
                setData(response.data.itenspedido);
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.");
            });
    };

    const apagarItemPedido = async (idPedido) => {
        console.log(idPedido);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/pedidos/" + idPedido + "/excluiritenspedido",
            { headers })
            .then((response) => {
                console.log(response.data.error);
                getItemPedido();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }


    useEffect(() => {
        getItemPedido();
    }, []);

    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">
                            {status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar Itens Pedidos</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inserir-itempedido" className="btn btn-outline-success btn-sm">Cadastrar Item Pedido</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>PedidoID</th>
                            <th>ServiçoID</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(itens => (
                            <tr key={itens.PedidoId}>
                                <th scope="row">{itens.PedidoId}</th>
                                <td>{itens.ServicoId}</td>
                                <td>{itens.quantidade}</td>
                                <td>{itens.valor}</td>
                                <td className="text-center">
                                    <Link to={"/editar-itempedido/" + itens.PedidoId}
                                        className="btn btn-outline-primary btn-sm">Atualizar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarItemPedido(itens.PedidoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}