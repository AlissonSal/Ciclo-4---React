import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';
import { api } from '../../../config';

export const ListarItemCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItemCompra = async () => {
        axios.get(api + "/listaitenscompra")
            .then((response) => {
                console.log(response.data.itenscompra);
                setData(response.data.itenscompra);
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.");
            });
    };

    const apagarItemCompra = async (idPedido) => {
        console.log(idPedido);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/compras/" + idPedido + "/excluiritenscompra",
            { headers })
            .then((response) => {
                console.log(response.data.error);
                getItemCompra();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }


    useEffect(() => {
        getItemCompra();
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
                        <h1>Visualizar Itens Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inserir-itemcompra" className="btn btn-outline-success btn-sm">Cadastrar Item Compra</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>CompraID</th>
                            <th>ProdutoID</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(itens => (
                            <tr key={itens.CompraId}>
                                <th scope="row">{itens.CompraId}</th>
                                <td>{itens.ProdutoId}</td>
                                <td>{itens.quantidade}</td>
                                <td>{itens.valor}</td>
                                <td className="text-center">
                                    <Link to={"/editar-itemcompra/" + itens.CompraId}
                                        className="btn btn-outline-primary btn-sm">Atualizar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarItemCompra(itens.CompraId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}