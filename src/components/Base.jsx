import '../assets/css/app.css';
import Header from './Header';
import Footer from './Footer';

const Base = ({ children }) => (
    <>
        <Header />
        <main className='min-h-[calc(100vh_-_12rem)]'>
            {children}
        </main>
        <Footer />
    </>
);

export default Base;