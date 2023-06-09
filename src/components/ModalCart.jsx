import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Loading from "./Loading";
import { addMessage, generateRandom, toSlug } from "../utils/functions";
import ProductContext from "../context/ProductContext";
import CardCart from "./Product/CardCart";

const ModalCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showModal, setShowModal } = useContext(CartContext);
    let value_total = 0.0;

    const closeModal = ({ target, currentTarget }) => {
        if (target === currentTarget) {
            setShowModal(false);
        }
    }

    const handleClickBtnFinalOrder = () => {
        if (cart.length > 0) {
            localStorage.removeItem("cart");
            setCart([]);
            addMessage("Pedido finalizado com sucesso", true);
        } else {
            addMessage("Carrinho vazio!", false);
        }
    }

    useEffect(() => {
        const prods = localStorage.getItem("cart");
        if (prods != null) {
            const json_prods = JSON.parse(prods);
            setCart(json_prods);
        } else {
            setCart([]);
        }
        setLoading(false);
    }, [showModal]);

    return (
        <>
            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    onClick={closeModal}
                >
                    <div className="relative w-10/12 sm:w-auto max-h-screen mx-auto max-w-3xl sm:min-w-[600px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-base sm:text-2xl font-semibold">
                                    Carrinho de compras
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 hover:opacity-95 transition-all text-3xl outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <ul>
                                    {loading ? <Loading /> :
                                        cart.map((prod, index) => {
                                            value_total += (prod.price * prod.count);
                                            return (
                                                <li className={index != 0 ? `border-t pt-2 mt-2` : ``} key={generateRandom()}>
                                                    <ProductContext.Provider value={{ prod, setCart }}>
                                                        <CardCart />
                                                    </ProductContext.Provider>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <p className="text-green-600 text-base sm:text-xl border-t border-b mt-6 py-4 font-bold text-center">
                                    Total {value_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                </p>
                                <button
                                    className="flex items-center justify-between mt-6 w-full py-2 px-3 border border-slate-600 bg-slate-600 text-white rounded font-bold transition-all hover:text-slate-600 hover:bg-white"
                                    onClick={handleClickBtnFinalOrder}
                                >
                                    <span>Finalizar pedido</span>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            </>
    );
}

export default ModalCart;