import { useEffect, useState } from 'react';

import ProductContext from '../context/ProductContext';
import CartContext from '../context/CartContext';

import Loading from '../components/Loading';
import Card from '../components/Product/Card';
import ModalCart from '../components/ModalCart';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { fetch_get, generateRandom } from '../utils/functions';
import { url } from '../utils/variables';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingProd, setLoadingProd] = useState(true);
    const [nowCategory, setNowCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleChangeCategory = ({ currentTarget }) => setNowCategory(currentTarget.value);

    useEffect(() => {
        const feths = async () => {
            setLoadingProd(true);
            const dataCategories = await fetch_get(`${url}/products/categories`);
            setCategories(dataCategories);
            const dataProducts = await fetch_get(`${url}/${nowCategory !== 'all' ? `products/category/${nowCategory}` : 'products'}`);
            setProducts(dataProducts);
            setLoadingProd(false);
            setLoading(false);
        }
        feths();
    }, [nowCategory]);

    return (
        <>
            <CartContext.Provider value={{ showModal, setShowModal }}>
                <ModalCart />
                <Header />
            </CartContext.Provider>
            <main className='min-h-[calc(100vh_-_12rem)]'>
                <section className="mt-10">
                    <div className="container">
                        {loading ? <Loading /> :
                            <>
                                <div className="bg-slate-50 px-2 lg:px-4 pb-3 lg:pb-6 pt-3 rounded">
                                    <label htmlFor="categories" className='font-bold mb-2 block text-stone-600 text-base lg:text-xl'>Categorias</label>
                                    <select name="categories" id="categories" className='w-full border h-10 text-stone-600' onChange={handleChangeCategory} value={nowCategory}>
                                        <option value="all">Todas</option>
                                        {categories.length > 0 &&
                                            categories.map(category => (
                                                <option value={category} key={generateRandom()}>{category}</option>
                                            ))}
                                    </select>
                                </div>
                                <nav className='mt-6 mb-16'>
                                    <h1 className='font-bold text-2xl lg:text-4xl text-stone-600 mb-6'>Produtos {nowCategory !== 'all' ? `(${nowCategory})` : ''}</h1>
                                    {loadingProd ? <Loading /> : 
                                        <ul className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                                            {products.map(product => (
                                                <li key={generateRandom()}>
                                                    <ProductContext.Provider value={{ product, setShowModal }}>
                                                        <Card />
                                                    </ProductContext.Provider>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </nav>
                            </>
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Products;