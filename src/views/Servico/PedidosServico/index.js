import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const PedidoServico = (props) => {
    // console.log(props.match.params.id);


    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id)

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/servico/" + id + "/pedidos")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            })
    }

    useEffect(() => {
        getItens();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servico"
                            className="btn btn-outline-success btn-sm" >Serviços</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>PedidoID</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ServicoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center">
                                    <Link to={"/editar-itempedido/" + item.PedidoId}
                                        className="btn btn-outline-primary btn-sm">Atualizar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};