import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/compras/" + id + "/editarcompra",
            { id, data, ClienteId }, { headers })
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
        const getCompra = async () => {
            await axios.get(api + "/compras/" + id)
                .then((response) => {
                    setId(response.data.comp.id)
                    setData(response.data.comp.data);
                    setClienteId(response.data.comp.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compra" className="btn btn-outline-success btn-sm">Compras</Link>
                    </div>
                </div>

                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}</Alert> : " "}
                {status.type === 'success' ? <Alert color="success">
                    {status.message}</Alert> : " "}

                <Form className="p-2" onSubmit={edtCompra}>
                    <FormGroup className="p-2">
                        <Label>CompraID</Label>
                        <Input type="text" name="id"
                            placeholder="Id da Compra" disabled
                            defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="text" name="data"
                            placeholder="Data da Compra" value={data}
                            onChange={e => setData(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ClienteId</Label>
                        <Input type="text" name="ClienteId"
                            placeholder="Id do Cliente" defaultValue={ClienteId} />
                    </FormGroup>

                    <Button type="submit" outline color="success">Salvar</Button>
                    <Button type="reset" outline color="danger">Limpar</Button>
                </Form>
            </Container>

        </div>
    )
}