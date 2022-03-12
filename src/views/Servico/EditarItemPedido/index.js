import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItemPedido = (props) => {

    const [PedidoId, setPedidoId] = useState(props.match.params.id);
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [ServicoId, setServicoId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtItemPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.put(api + "/pedidos/" + PedidoId + "/editaritempedido",
            { PedidoId, quantidade, valor, ServicoId }, { headers })
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
        const getItemPedido = async () => {
            await axios.get(api + "/pedido/" + PedidoId + "/itenspedidos")
                .then((response) => {
                    setPedidoId(response.data.item.PedidoId)
                    setQuantidade(response.data.item.quantidade);
                    setValor(response.data.item.valor);
                    setServicoId(response.data.item.ServicoId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getItemPedido();
    }, [PedidoId]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servico"
                            className="btn btn-outline-success btn-sm">Serviços</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtItemPedido}>
                    <FormGroup className="p-2">
                        <Label>ID Pedido</Label>
                        <Input type="text" name="PedidoId"
                            placeholder="Id do Pedido"
                            defaultValue={PedidoId} />
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