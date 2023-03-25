import '../assets/sass/app.scss';
import Header from './Header';
import Footer from './Footer';
import ModalCart from './ModalCart';
import { useState } from 'react';
import CartContext from '../context/CartContext';

const Base = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <CartContext.Provider value={{ showModal, setShowModal }}>
            <ModalCart />
            <Header />
            <main className='min-h-[calc(100vh_-_12rem)]'>
                {children}
            </main>
            <Footer />
        </CartContext.Provider>
    );
}

export default Base;