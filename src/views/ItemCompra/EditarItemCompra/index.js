import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItemCompra = (props) => {

    const [id, setId] = useState(props.match.params.id);
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

        await axios.put(api + "/compras/" + id + "/editaritemcompra",
            { id, quantidade, valor, ProdutoId }, { headers })
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
          await axios.get(api + "/itemcompra/compra/" + id)
            .then((response) => {
              const compra = response.data.compras.item_compras.find((item) => {
                return item.CompraId === Number(id);
              });
              setId(compra.CompraId);
              setQuantidade(compra.quantidade);
              setValor(compra.valor);
              setProdutoId(compra.ProdutoId);
            })
            .catch((erro) => {
              console.log("Erro: Não foi possível se conectar a API.", erro);
            });
        };
        getItemCompra();
      }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-itemcompra"
                            className="btn btn-outline-success btn-sm">Itens Compra</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtItemCompra}>
                    <FormGroup className="p-2">
                        <Label>CompraID</Label>
                        <Input type="text" name="id"
                            placeholder="ID da Compra" disabled
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ProdutoID</Label>
                        <Input type="text" name="ProdutoId"
                            placeholder="Id do Produto" disabled
                            defaultValue={ProdutoId} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                        <Input type="text" name="quantidade"
                            placeholder="Quantidade" value={quantidade}
                            onChange={(item) => setQuantidade(item.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor"
                            placeholder="Valor" value={valor}
                            onChange={(item) => setValor(item.target.value)} />
                    </FormGroup>
                    <Button type="submit" outline color="success">Salvar</Button>
                    <Button type="reset" outline color="danger">Limpar</Button>
                </Form>
            </Container>

        </div>
    )
}