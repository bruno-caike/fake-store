import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { routes } from "../utils/variables";
import CartContext from "../context/CartContext";
import { useContext } from "react";

const Header = () => {
    const { setShowModal } = useContext(CartContext);

    return (
        <header className="bg-slate-800">
            <div className="container flex items-center justify-between h-24">
                <Link to={routes.home} className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">Fake Store</Link>
                <button 
                    className="text-white text-2xl transition-all hover:text-slate-400"
                    onClick={() => setShowModal(true)}
                ><FontAwesomeIcon icon={faCartShopping} /></button>
            </div>
        </header>
    );
}

export default Header;