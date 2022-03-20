import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirItemCompra = () => {

    const [itemCompra, setItemCompra] = useState({
        quantidade: '',
        valor: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemCompra({
        ...itemCompra, [e.target.name]: e.target.value
    })

    const cadItemCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/itenscompra", itemCompra, { headers })
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
                        <h1>Cadastar Item Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-itemcompra"
                            className="btn btn-outline-success btn-sm">Itens Compra</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="primary">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={cadItemCompra}>
                    <FormGroup className="p-2">
                        <Label>CompraID</Label>
                        <Input type="text" name="CompraId"
                            placeholder="ID da Compra"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>ProdutoID</Label>
                        <Input type="text" name="ProdutoId"
                            placeholder="ID do Produto"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                        <Input type="text" name="quantidade" placeholder="Quantidade"
                            onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor" placeholder="Valor"
                            onChange={valorInput} />
                    </FormGroup>
                    <Button type="submit" outline color="success">
                        Finalizar Cadastro do Item Compra</Button>
                    <Button type="reset" outline color="danger">Limpar</Button>
                </Form>

            </Container>

        </div>
    )

}