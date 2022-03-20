import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarPedido = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [dataPedido, setDataPedido] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.put(api + "/pedidos/" + id + "/editarpedido",
            { id, dataPedido, ClienteId }, { headers })
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
        const getPedido = async () => {
            await axios.get(api + "/pedidos/" + id)
                .then((response) => {
                    setId(response.data.ped.id)
                    setDataPedido(response.data.ped.dataPedido);
                    setClienteId(response.data.ped.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedido"
                            className="btn btn-outline-success btn-sm">Pedidos</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtPedido}>
                    <FormGroup className="p-2">
                        <Label>PedidoID</Label>
                        <Input type="text" name="id"
                            placeholder="Id do Pedido" disabled
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ClienteID</Label>
                        <Input type="text" name="ClienteId"
                            placeholder="ID do Cliente" disabled defaultValue={ClienteId} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="text" name="dataPedido"
                            placeholder="Data do Pedido" value={dataPedido}
                            onChange={e => setDataPedido(e.target.value)} />
                    </FormGroup>
                    <Button type="submit" outline color="success">Salvar</Button>
                    <Button type="reset" outline color="danger">Limpar</Button>
                </Form>
            </Container>

        </div>
    )
}