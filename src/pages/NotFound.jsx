import { Link } from 'react-router-dom';
import Base from '../components/Base';
import { routes } from '../utils/variables';

const NotFound = () =>  (
    <Base>
        <section>
            <div>
                <header>
                    <h1>Página não encontrada</h1>
                    <p>A URL solicitada não pôde ser encontrada. <br />Por favor verifique o endereço ou informe o administrador.</p>
                </header>
                <Link to={routes.home}>Voltar para início</Link>
            </div>
        </section>
        
    </Base>
);
  
export default NotFound;
  