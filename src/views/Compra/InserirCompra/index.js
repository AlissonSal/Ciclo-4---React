import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirCompra = () => {

    const [compra, setCompra] = useState({
        ClienteId: '',
        data: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        ...compra,
        [e.target.name]: e.target.value
    })

    const cadCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/compras", compra, { headers })
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
                        <h1>Cadastar Compras</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compra"
                            className="btn btn-outline-primary btn-sm">Compras</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="primary">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={cadCompra}>
                    <FormGroup className="p-2">
                        <Label>Id do Cliente</Label>
                        <Input type="text" name="ClienteId"
                            placeholder="Id do Cliente"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="text" name="data" placeholder="Data"
                            onChange={valorInput} />
                    </FormGroup>
                    <Button type="submit" outline color="success">
                        Finalizar Cadastro da Compra</Button>
                    <Button type="reset" outline color="success">Limpar</Button>
                </Form>

            </Container>

        </div>
    )
}