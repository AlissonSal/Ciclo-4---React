import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItemPedido = (props) => {

    const [id, setId] = useState(props.match.params.id);
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

        await axios.put(api + "/pedidos/" + id + "/editaritempedido",
            { id, quantidade, valor, ServicoId }, { headers })
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
          await axios
            .get(api + "/itempedido/pedido/" + id)
            .then((response) => {
              const pedido = response.data.pedidos.item_pedidos.find((item) => {
                return item.PedidoId === Number(id);
              });
              setId(pedido.PedidoId);
              setQuantidade(pedido.quantidade);
              setValor(pedido.valor);
              setServicoId(pedido.ServicoId);
            })
            .catch((erro) => {
              console.log("Erro: Não foi possível se conectar a API.", erro);
            });
        };
        getItemPedido();
      }, [id]);

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
                        <Label>PedidoID</Label>
                        <Input type="text" name="id"
                            placeholder="ID do Pedido" disabled
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ServiçoID</Label>
                        <Input type="text" name="ServicoId"
                            placeholder="ID do Serviço" disabled
                            defaultValue={ServicoId} />
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