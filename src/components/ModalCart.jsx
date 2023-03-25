import { useContext } from "react";
import CartContext from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const ModalCart = () => {
    const { showModal, setShowModal } = useContext(CartContext);

    const closeModal = ({ target, currentTarget }) => {
        if (target === currentTarget) {
            setShowModal(false);
        }
    }

    return (
        <>
            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    onClick={closeModal}
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
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