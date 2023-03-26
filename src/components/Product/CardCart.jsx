import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../context/ProductContext";
import { addLocalStorage, addMessage, generateRandom, toSlug } from "../../utils/functions";
import { routes } from "../../utils/variables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const CardCart = () => {
    const { prod, setCart } = useContext(ProductContext);
    const [quantity, setQuantity] = useState(prod.count)

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

    const handleChangeSelectQuantity = ({ currentTarget }) => {
        const prods = localStorage.getItem("cart");
        if (prods != null) {
            const json_prod = JSON.parse(prods);
            for (const jp of json_prod) {
                if (prod.id == jp.id) {jp.count = currentTarget.value;}
            }
            localStorage.setItem("cart", JSON.stringify(json_prod));
            setQuantity(currentTarget.value);
            setCart(json_prod);
            addMessage("Quantidade alterada com sucesso!", true);
        }
    }

    const fillSelect = count => {
        let arrayCount = [];
        for (let index = 0; index < count; index++) {
            arrayCount.push(index + 1);
        }
        return arrayCount;
    }

    return (
        <article className="flex">
            <div className="w-16 sm:w-20 h-16 sm:h-20 p-1 border rounded flex items-center justify-center mr-3 sm:mr-5">
                <img src={prod.image} alt={prod.title} className="max-w-full max-h-full bg-cover bg-no-repeat bg-center" />
            </div>
            <header className="flex justify-between items-start w-full">
                <div className="w-full mt-1 sm:mt-3 pr-4">
                    <Link to={routes.productShow(prod.id, toSlug(prod.title))}>
                        <h3 className="text-sm sm:text-base">{prod.title}</h3>
                    </Link>
                    <p className="flex justify-between items-center text-sm sm:text-base">
                        {/* <span>Qtde: {prod.count}</span> */}
                        <select name="quantity_cart" id="quantity_cart" className='border h-10 text-stone-600 w-20 rounded' onChange={handleChangeSelectQuantity} value={quantity}>
                            {fillSelect(prod.count_total).map(count => (
                                <option value={count} key={generateRandom()}>{count}</option>
                            ))}
                        </select>
                        <strong className="text-green-600">{(prod.price * prod.count).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>
                    </p>
                </div>  
                <button 
                    className="p-1 mt-1 sm:mt-5 bg-transparent border-0 text-red-600 opacity-70 hover:opacity-95 transition-all text-2xl outline-none focus:outline-none"
                    onClick={handleClickBtnDelProd}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </header>
        </article>
    );
}

export default CardCart;