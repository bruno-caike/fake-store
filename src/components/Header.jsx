import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import { routes } from "../utils/variables";

const Header = () => {
    return (
        <header className="bg-orange-400">
            <div className="container flex items-center justify-between py-8">
                <Link to={routes.home} className="text-white font-bold text-4xl">Fake Store</Link>
                <button className="text-white text-2xl transition-all hover:text-slate-400"><FontAwesomeIcon icon={faCartShopping} /></button>
            </div>
        </header>
    );
}

export default Header;