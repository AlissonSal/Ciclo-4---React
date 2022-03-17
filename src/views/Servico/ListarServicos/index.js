import { isDocument } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarServico = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            })
    }

    const apagarServico = async (idServico) => {
        console.log(idServico);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/excluirservico/" + idServico,
            { headers })
            .then((response) => {
                console.log(response.data.error);
                getServicos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }

    useEffect(() => {
        getServicos();
    }, []);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Visualizar Informações do Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/inserir-servico"
                            className="btn btn-outline-success btn-sm" >Cadastrar Serviço</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center">
                                    <Link to={"/listar-pedido/" + item.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                        <Link to={"/editar-servico/" + item.id}
                                        className="btn btn-outline-success btn-sm">Atualizar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarServico(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </Container>
        </div >
    );
};