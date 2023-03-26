import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Base from '../components/Base';
import Loading from '../components/Loading';
import NotFound from './NotFound';

import { addLocalStorage, fetch_get, generateRandom, toSlug } from '../utils/functions';
import { routes, url } from '../utils/variables';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faHouse } from "@fortawesome/free-solid-svg-icons"
import { Splide, SplideSlide } from '@splidejs/react-splide';


const Product = () => {
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [exist, setExist] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchs = async (intId) => {
            const dataProduct = await fetch_get(`${url}/products/${intId}`);
            setProduct(dataProduct);
            setLoading(false);
        }
        const intId = parseInt(id);
        if (intId != 0 && !isNaN(intId)) {
            fetchs(intId);
        } else {
            setExist(false);
        }
    }, []);

    const fillSelect = count => {
        let arrayCount = [];
        for (let index = 0; index < count; index++) {
            arrayCount.push(index + 1);
        }
        return arrayCount;
    }

    const handleClickBtnAddCart = () => {
        const newProduct = {
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            count: count,
            count_total: product.rating.count
        }
        const addCart = addLocalStorage(newProduct);
        console.log(addCart)
    }

    const handleChangeSelectQuantity = ({ currentTarget }) => setCount(currentTarget.value);

    return (
        <Base>
            {!exist ? <NotFound /> :
                <section className='pb-16 pt-12'>
                    <div className="container">
                        {loading && product === null ? <Loading /> :
                            <div>
                                <ul className='text-stone-600 flex items-center flex-wrap mb-12'>
                                    <li><Link to={routes.home} className="text-stone-600 transition-all hover:text-slate-600"><FontAwesomeIcon icon={faHouse} /></Link></li>
                                    <li className='mx-2'>/</li>
                                    <li><Link to={routes.productShow(product.id, toSlug(product.title))} className="text-stone-600 transition-all hover:text-slate-600">{product.title.length > 40 ? `${product.title.substr(0, 35)}[...]` : product.title}</Link></li>
                                </ul>
                                <div className='grid grid-cols-1 md:grid-cols-[400px_1fr] gap-10'>  
                                    <div className="p-4 border rounded flex items-center justify-center w-full sm:w-[400px] md:w-full">
                                        <Splide 
                                            options={{
                                                width : '100%',
                                                type   : 'loop',
                                                gap   : '1rem',
                                                pagination: false,
                                                arrows: false
                                            }}
                                        >
                                            <SplideSlide>
                                                <a href="#"><img src={product.image} alt={product.title} className="max-w-full max-h-full bg-cover bg-no-repeat bg-center" /></a>
                                            </SplideSlide>
                                            <SplideSlide>
                                                <a href="#"><img src={product.image} alt={product.title} className="max-w-full max-h-full bg-cover bg-no-repeat bg-center" /></a>
                                            </SplideSlide>
                                            <SplideSlide>
                                                <a href="#"><img src={product.image} alt={product.title} className="max-w-full max-h-full bg-cover bg-no-repeat bg-center" /></a>
                                            </SplideSlide>
                                            <SplideSlide>
                                                <a href="#"><img src={product.image} alt={product.title} className="max-w-full max-h-full bg-cover bg-no-repeat bg-center" /></a>
                                            </SplideSlide>
                                        </Splide>
                                    </div>
                                    <div className='text-stone-600'>
                                        <header>
                                            <span className="bg-slate-600 text-white py-0.5 px-2 rounded-sm text-sm">{product.category}</span>
                                            <h1 className="my-4 font-bold text-2xl sm:text-3xl lg:text-5xl">{product.title}</h1>
                                            <p>{product.description}</p>
                                        </header>
                                        <ul className='mt-4'>
                                            <li className='mb-1'><p><strong>Valor:</strong> <span className="text-green-600 text-2xl font-bold">{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p></li>
                                            <li className='mb-1'><p><strong>Avaliação:</strong> {product.rating.rate}</p></li>
                                            <li>
                                                <p><strong>Quantidade:</strong></p>
                                                <select name="quantity" id="quantity" className='border h-10 text-stone-600 w-20 rounded' onChange={handleChangeSelectQuantity} value={count}>
                                                    {fillSelect(product.rating.count).map(count => (
                                                        <option value={count} key={generateRandom()}>{count}</option>
                                                    ))}
                                                </select>
                                            </li>
                                        </ul>
                                        <button
                                            className="flex items-center justify-between w-full sm:w-80 py-2 px-3 border border-slate-600 bg-slate-600 text-white rounded font-bold transition-all hover:text-slate-600 hover:bg-white mt-5"
                                            onClick={handleClickBtnAddCart}
                                        >
                                            <span>Adicionar no carrinho</span>
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            }
        </Base>
    );
}

export default Product;