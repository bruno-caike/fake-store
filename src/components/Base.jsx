import '../assets/sass/app.scss';
import Header from './Header';
import Footer from './Footer';

const Base = ({ children }) => {
    return (
        <>
            <Header />
            <main className='min-h-[calc(100vh_-_12rem)]'>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Base;