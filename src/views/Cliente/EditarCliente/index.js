import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCliente = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [clienteDesde, setClienteDesde] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.put(api + "/clientes/" + id + "/editarcliente",
            { id, nome, endereco, cidade, uf, nascimento, clienteDesde }, { headers })
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
        const getCliente = async () => {
            await axios.get(api + "/clientes/" + id)
                .then((response) => {
                    setId(response.data.cli.id)
                    setNome(response.data.cli.nome);
                    setEndereco(response.data.cli.endereco);
                    setCidade(response.data.cli.cidade);
                    setUf(response.data.cli.uf);
                    setNascimento(response.data.cli.nascimento);
                    setClienteDesde(response.data.cli.clienteDesde);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente"
                            className="btn btn-outline-success btn-sm">Clientes</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtCliente}>
                    <FormGroup className="p-2">
                        <Label>ID Cliente</Label>
                        <Input type="text" name="id"
                            placeholder="Id do Produto"
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            placeholder="Nome do Cliente" value={nome}
                            onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Endereço</Label>
                        <Input type="text" name="endereco"
                            placeholder="Endereço" value={endereco}
                            onChange={e => setEndereco(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cidade</Label>
                        <Input type="text" name="cidade"
                            placeholder="Cidade" value={cidade}
                            onChange={e => setCidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>UF</Label>
                        <Input type="text" name="uf"
                            placeholder="UF" value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data de Nascimento</Label>
                        <Input type="text" name="nascimento"
                            placeholder="Data de Nascimento" value={nascimento}
                            onChange={e => setNascimento(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cliente Desde</Label>
                        <Input type="text" name="cliendeDesde"
                            placeholder="Cliente Desde" value={clienteDesde}
                            onChange={e => setClienteDesde(e.target.value)} />
                    </FormGroup>
                    <Button type="submit" outline color="warning">Salvar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>

        </div>
    )
}