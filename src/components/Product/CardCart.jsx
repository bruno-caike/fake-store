import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../context/ProductContext";
import { addMessage, toSlug } from "../../utils/functions";
import { routes } from "../../utils/variables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const CardCart = () => {
    const { prod, setCart } = useContext(ProductContext);

    const handleClickBtnDelProd = () => {
        const last_prods = localStorage.getItem("cart");
        if (last_prods != null) {
            const json_prod = JSON.parse(last_prods);
            const result = json_prod.filter(p => p.id != prod.id);
            localStorage.setItem("cart", JSON.stringify(result));
            setCart(result);
            addMessage('Produto excluido do carrinho', true);
        }
    }

    return (
        <Link to={routes.productShow(prod.id, toSlug(prod.title))}>
            <article className="flex">
                <div className="w-20 h-20 p-1 border rounded flex items-center justify-center mr-5">
                    <img src={prod.image} alt={prod.title} className="max-w-full max-h-full bg-cover bg-no-repeat bg-center" />
                </div>
                <header className="flex justify-between items-start w-full">
                    <div className="w-full mt-3 pr-4">
                        <h3>{prod.title}</h3>
                        <p className="flex justify-between items-center">
                            <span>Qtde: {prod.count}</span>
                            <strong className="text-green-600">{(prod.price * prod.count).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>
                        </p>
                    </div>  
                    <button 
                        className="p-1 mt-5 bg-transparent border-0 text-red-600 opacity-70 hover:opacity-95 transition-all text-2xl outline-none focus:outline-none"
                        onClick={handleClickBtnDelProd}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </header>
            </article>
        </Link>
    );
}

export default CardCart;