import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarProduto = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtProduto = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.put(api + "/produtos/" + id + "/editarproduto",
            { id, nome, descricao }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração realizada com sucesso.'
                });
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar a API.'
                });
            });
    }

    useEffect(() => {
        const getProduto = async () => {
            await axios.get(api + "/produto/" + id)
                .then((response) => {
                    setId(response.data.prod.id)
                    setNome(response.data.prod.nome);
                    setDescricao(response.data.prod.descricao);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getProduto();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Produto</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produto"
                            className="btn btn-outline-success btn-sm">Produtos</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtProduto}>
                    <FormGroup className="p-2">
                        <Label>ID Produto</Label>
                        <Input type="text" name="id"
                            placeholder="Id do Produto" disabled
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            placeholder="Nome do Serviço" value={nome}
                            onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao"
                            placeholder="Descrição do Serviço" value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>
                    <Button type="submit" outline color="success">Salvar</Button>
                    <Button type="reset" outline color="danger">Limpar</Button>
                </Form>
            </Container>

        </div>
    )
}