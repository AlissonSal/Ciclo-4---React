import { isDocument } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            })
    }

    const apagarProduto = async (idProduto) => {
        console.log(idProduto);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/excluirproduto/" + idProduto,
            { headers })
            .then((response) => {
                console.log(response.data.error);
                getProdutos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }

    useEffect(() => {
        getProdutos();
    }, []);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Informações do Produto</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/inserir-produto"
                            className="btn btn-outline-primary btn-sm" >Cadastrar Produto</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>
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
                        {data.map(prod => (
                            <tr key={prod.id}>
                                <td>{prod.id}</td>
                                <td>{prod.nome}</td>
                                <td>{prod.descricao}</td>
                                <td className="text-center">
                                    <Link to={"/listar-compra/" + prod.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                        <Link to={"/listar-compra/" + prod.id}
                                        className="btn btn-outline-success btn-sm">Atualizar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarProduto(prod.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </Container>
        </div >
    );
};