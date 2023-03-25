import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from "../pages/Products";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";

import { routes } from "../utils/variables";

export const RoutesSystem = () => {
    return (
        <Router>
            <Routes>
                <Route path={routes.home} element={<Products />} />
                <Route path={routes.productShow(':id', ':slug')} element={<Product />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default RoutesSystem;