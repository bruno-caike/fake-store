import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

import { useContext } from "react";
import { Link } from "react-router-dom";

import ProductContext from '../../context/ProductContext'
import { toSlug } from "../../utils/functions";
import { routes } from "../../utils/variables";

const Card = () => {
    const { product } = useContext(ProductContext);
    return (
        <article className="border rounded p-2 grid h-full text-stone-600">
            <div className="w-full h-48 p-4 border rounded flex items-center justify-center relative">
                <img src={product.image} alt={product.title} className="max-w-full max-h-full bg-cover bg-no-repeat bg-center" />
                <span class="bg-slate-600 text-white py-0.5 px-2 absolute rounded-sm left-2 bottom-[-.625rem] text-xs">{product.category}</span>
            </div>
            <header className="pt-3 px-2 h-full flex justify-between flex-col">
                <div>
                    <h2 className="text-lg mb-1 font-bold">{product.title.length > 40 ? `${product.title.substr(0, 35)}[...]` : product.title}</h2>
                    <p className="grid">
                        <strong className="text-green-600 text-xl">{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>
                        <span className="text-sm">Avaliação: {product.rating.rate}</span>
                    </p>
                </div>
                <ul className="mt-3">
                    <li className="mb-2">
                        <Link 
                            to={routes.productShow(product.id, toSlug(product.title))}
                            className="flex items-center justify-between w-full py-2 px-3 border border-slate-600 bg-slate-600 text-white rounded font-bold transition-all hover:text-slate-600 hover:bg-white"
                        >
                            <span>Ver produto</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </li>
                    <li>
                        <button
                            className="flex items-center justify-between w-full py-2 px-3 border border-slate-600 bg-slate-600 text-white rounded font-bold transition-all hover:text-slate-600 hover:bg-white"
                        >
                            <span>Adicionar no carrinho</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </li>
                </ul>
            </header>
        </article>
    );
};

export default Card;