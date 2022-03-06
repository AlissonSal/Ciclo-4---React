import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirPedido = () => {

    const [pedido, setPedido] = useState({
        nome: '',
        nascimento: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPedido({
        ...pedido,
        [e.target.name]: e.target.value
    })

    const cadPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/pedidos", pedido, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    }

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cadastar Pedidos</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedido"
                            className="btn btn-outline-primary btn-sm">Pedidos</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="primary">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={cadPedido}>
                    <FormGroup className="p-2">
                        <Label>ClienteId</Label>
                        <Input type="text" name="ClienteId"
                            placeholder="Id do Cliente"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data do Pedido</Label>
                        <Input type="text" name="dataPedido" placeholder="Data Pedido"
                            onChange={valorInput} />
                    </FormGroup>
                    <Button type="submit" outline color="success">
                        Finalizar Cadastro do Pedido</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>

            </Container>

        </div>
    )
}