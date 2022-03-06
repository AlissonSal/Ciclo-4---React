import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const CompraProduto = (props) => {
    // console.log(props.match.params.id);


    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id)

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItemCompra = async () => {
        await axios.get(api + "/produto/" + id + "/compras")
            .then((response) => {
                console.log(response.data.itens);
                setData(response.data.itens);
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
        getItemCompra();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Compras do Produto</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/listar-produto"
                            className="btn btn-outline-primary btn-sm" >Produtos</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            {/* <th>Visualizar</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(itens => (
                            <tr key={itens.ProdutoId}>
                                <td>{itens.CompraId}</td>
                                <td>{itens.quantidade}</td>
                                <td>{itens.valor}</td>
                                {/* <td className="text-center">
                                    <Link to={"/listar-pedido/"}
                                    className="btn btn-outline-primary btn-sm">Consultar</Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};