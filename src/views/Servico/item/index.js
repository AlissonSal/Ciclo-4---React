import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const Item = (props) => {
    // console.log(props.match.params.id);

    
    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id)

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(api + "/servico/"+id+"pedidos")
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
                <div>
                    <h1>Visualizar Informações do Serviço</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>:""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center">
                                    <Link to={"/listar-pedido/"+item.id}
                                    className="btn btn-outline-primary btn-sm">Consultar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};