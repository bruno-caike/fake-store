import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { routes } from "../utils/variables";

export const RoutesSystem = () => {
    return (
        <Router>
            <Routes>
                <Route path={routes.home} element={<Home />} />
                {/* <Route path={routes.postsShow(':id', ':slug')} element={<Post />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default RoutesSystem;