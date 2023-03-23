import '../assets/css/app.css';
import Header from './Header';

const Base = ({ children }) => (
    <>
        <Header />
        {children}
    </>
);

export default Base;