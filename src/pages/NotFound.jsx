import { Link } from 'react-router-dom';
import Base from '../components/Base';
import { routes } from '../utils/variables';

const NotFound = () =>  (
    <Base>
        <section className='py-16'>
            <div className="container">
                <header className='text-center'>
                    <h1 className='font-bold text-2xl sm:text-5xl mb-6'>Página não encontrada</h1>
                    <p className='text-base sm:text-xl'>A URL solicitada não pôde ser encontrada. <br />Por favor verifique o endereço ou informe o administrador.</p>
                </header>
                <Link to={routes.home} className="mx-auto mt-5 sm:mt-10 flex items-center justify-center w-full sm:w-80 py-2 px-3 border border-slate-600 bg-slate-600 text-white rounded font-bold transition-all hover:text-slate-600 hover:bg-white">Voltar para início</Link>
            </div>
        </section>
        
    </Base>
);
  
export default NotFound;
  