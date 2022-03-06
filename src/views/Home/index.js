import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Home</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-cliente" className="btn btn-outline-primary btn-sm">Cliente</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-servico" className="btn btn-outline-primary btn-sm">Serviço</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-pedido" className="btn btn-outline-primary btn-sm">Pedido</a>
                    </div>  
                    <div className="p-2">
                        <a href="/listar-produto" className="btn btn-outline-primary btn-sm">Produto</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-compra" className="btn btn-outline-primary btn-sm">Compra</a>
                    </div>  
                </div>
            </Container >
        </div>
    );
};