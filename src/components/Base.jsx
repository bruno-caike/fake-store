import '../assets/css/app.css';
import Header from './Header';
import Footer from './Footer';

const Base = ({ children }) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

export default Base;