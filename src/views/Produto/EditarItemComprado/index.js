import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItemCompra = (props) => {

    const [CompraId, setCompraId] = useState(props.match.params.id);
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [ProdutoId, setProdutoId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtItemCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.put(api + "/compras/" + CompraId + "/editaritemcompra",
            { CompraId, quantidade, valor, ProdutoId }, { headers })
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
        const getItemCompra = async () => {
            await axios.get(api + "/compra/" + CompraId + "/itenscomprados")
                .then((response) => {
                    setCompraId(response.data.itcompra.CompraId);
                    setQuantidade(response.data.itcompra.quantidade);
                    setValor(response.data.itcompra.valor);
                    setProdutoId(response.data.itcompra.ProdutoId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getItemCompra();
    }, [CompraId]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produto"
                            className="btn btn-outline-success btn-sm">Produtos</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtItemCompra}>
                    <FormGroup className="p-2">
                        <Label>ID Compra</Label>
                        <Input type="text" name="CompraId"
                            placeholder="Id da Compra"
                            defaultValue={CompraId} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                        <Input type="text" name="quantidade"
                            placeholder="Quantidade" value={quantidade}
                            onChange={e => setQuantidade(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor"
                            placeholder="Valor" value={valor}
                            onChange={e => setValor(e.target.value)} />
                    </FormGroup>
                    <Button type="submit" outline color="warning">Salvar</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>
            </Container>

        </div>
    )
}