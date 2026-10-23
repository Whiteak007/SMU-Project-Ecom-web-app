import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { FaArrowRight } from 'react-icons/fa';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);
    const handleNavLinkClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products])

    return (
        <div className='my-16'>
            <div className='flex justify-between items-center mb-8'>
                <div className='text-center md:text-left'>
                    <Title text1={'RELATED'} text2={'PRODUCTS'} />
                    <p className='text-gray-500 mt-2'>Products you might be interested in</p>
                </div>
                <button className='hidden md:flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors duration-300'>
                    View all <FaArrowRight />
                </button>
            </div>

            <div onClick={handleNavLinkClick()} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                {related.map((item, index) => (
                    <ProductItem 
                        key={index} 
                        id={item._id} 
                        name={item.name} 
                        price={item.price} 
                        image={item.image} 
                        oldPrice={item.oldPrice}
                    />
                ))}
            </div>

            <div className='mt-8 flex justify-center md:hidden'>
                <button className='flex items-center gap-2 px-6 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors duration-300'>
                    View all <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default RelatedProducts;