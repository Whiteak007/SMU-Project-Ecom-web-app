import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  const nextImage = () => {
    if (currentImageIndex < productData.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setImage(productData.image[currentImageIndex + 1]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setImage(productData.image[currentImageIndex - 1]);
    }
  };

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      user: "Alex Johnson",
      rating: 4,
      comment: "Great product! Fits perfectly and the quality is excellent.",
      date: "2023-10-15",
      image: "https://cdn.getmerlin.in/cms/pfp3_d7855f9562.webp"
    },
    {
      id: 2,
      user: "Sarah Williams",
      rating: 5,
      comment: "Absolutely love it! Better than I expected. Highly recommend.",
      date: "2023-09-28",
      image: "https://cdn.getmerlin.in/cms/pfp3_d7855f9562.webp"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 inline" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
      }
    }
    return stars;
  };

  return productData ? (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-opacity ease-in duration-500 opacity-100'>
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span className="hover:text-orange-500 cursor-pointer">Home</span>
        <IoIosArrowForward className="mx-2" />
        <span className="hover:text-orange-500 cursor-pointer">{productData.category}</span>
        <IoIosArrowForward className="mx-2" />
        <span className="text-gray-700 font-medium">{productData.name}</span>
      </div>

      {/* Product Data */}
      <div className='flex flex-col lg:flex-row gap-8 xl:gap-12'>
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className='flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 md:w-24'>
            {productData.image.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex-shrink-0 w-20 h-20 md:w-full md:h-24 cursor-pointer border-2 rounded-md overflow-hidden transition-all duration-300 ${image === item ? 'border-orange-500' : 'border-gray-200'}`}
                onClick={() => {
                  setImage(item);
                  setCurrentImageIndex(index);
                }}
              >
                <img 
                  src={item} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                  alt={`Thumbnail ${index + 1}`} 
                />
              </div>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="relative w-full md:w-[calc(100%-6rem)] aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={productData.name} 
              className="w-full h-full object-contain transition-opacity duration-300"
            />
            {/* Navigation arrows for mobile */}
            <div className="md:hidden absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-2">
              <button 
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className={`bg-white bg-opacity-70 rounded-full p-2 shadow-md ${currentImageIndex === 0 ? 'opacity-50' : 'hover:bg-opacity-100'}`}
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextImage}
                disabled={currentImageIndex === productData.image.length - 1}
                className={`bg-white bg-opacity-70 rounded-full p-2 shadow-md ${currentImageIndex === productData.image.length - 1 ? 'opacity-50' : 'hover:bg-opacity-100'}`}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          <h1 className='font-bold text-3xl md:text-4xl text-gray-800'>{productData.name}</h1>
          
          {/* Rating */}
          <div className='flex items-center gap-2 mt-4'>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                star <= 4 ? 
                  <FaStar key={star} className="text-yellow-400 text-sm" /> : 
                  <FaRegStar key={star} className="text-yellow-400 text-sm" />
              ))}
            </div>
            <span className='text-sm text-gray-600'>(122 reviews)</span>
            <span className='text-sm text-green-600 ml-2 font-medium'>In Stock</span>
          </div>
          
          {/* Price */}
          <div className='mt-6'>
            <p className='text-3xl font-bold text-gray-900'>{currency}{productData.price}</p>
            {productData.oldPrice && (
              <p className='text-lg text-gray-500 line-through'>{currency}{productData.oldPrice}</p>
            )}
          </div>
          
          {/* Description */}
          <p className='mt-6 text-gray-600 leading-relaxed'>{productData.description}</p>
          
          {/* Size Selection */}
          <div className='mt-8'>
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>Select Size</h3>
            <div className='flex flex-wrap gap-3'>
              {productData.sizes.map((item, index) => (
                <button 
                  onClick={() => setSize(item)} 
                  className={`py-2 px-5 rounded-md text-sm font-medium transition-all duration-200 ${item === size ? 
                    'bg-orange-500 text-white shadow-md' : 
                    'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} 
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          {/* Add to Cart */}
          <button 
            onClick={() => addToCart(productData._id, size)}
            disabled={!size}
            className={`mt-8 w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-md text-white font-medium transition-all duration-300 ${!size ? 
              'bg-gray-400 cursor-not-allowed' : 
              'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl'}`}
          >
            <FaShoppingCart />
            ADD TO CART
          </button>
          
          {/* Product Policy */}
          <div className='mt-8 pt-6 border-t border-gray-200'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
              <div className='flex items-start gap-3'>
                <div className='bg-green-100 p-2 rounded-full'>
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className='font-medium text-gray-800'>100% Original</p>
                  <p className='text-gray-500'>Authentic products guarantee</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='bg-blue-100 p-2 rounded-full'>
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div>
                  <p className='font-medium text-gray-800'>Easy Returns</p>
                  <p className='text-gray-500'>7-day return policy</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='bg-purple-100 p-2 rounded-full'>
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </div>
                <div>
                  <p className='font-medium text-gray-800'>Cash on Delivery</p>
                  <p className='text-gray-500'>Pay when you receive</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='bg-red-100 p-2 rounded-full'>
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className='font-medium text-gray-800'>Fast Delivery</p>
                  <p className='text-gray-500'>2-4 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='mt-16'>
        <div className='flex border-b'>
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 font-medium text-sm transition-all duration-300 ${activeTab === 'description' ? 
              'text-orange-500 border-b-2 border-orange-500' : 
              'text-gray-500 hover:text-gray-700'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-medium text-sm transition-all duration-300 ${activeTab === 'reviews' ? 
              'text-orange-500 border-b-2 border-orange-500' : 
              'text-gray-500 hover:text-gray-700'}`}
          >
            Reviews (122)
          </button>
        </div>
        
        <div className='border px-6 py-8'>
          {activeTab === 'description' ? (
            <div className='text-gray-600 space-y-4'>
              <p>{productData.description}</p>
              <p>E-commerce websites typically display products or services along with detailed information. Our products are made with premium materials and go through rigorous quality checks to ensure customer satisfaction.</p>
              <ul className='list-disc pl-5 space-y-2'>
                <li>Premium quality materials</li>
                <li>Eco-friendly production process</li>
                <li>Designed for comfort and durability</li>
                <li>Easy to maintain and care for</li>
              </ul>
            </div>
          ) : (
            <div className='space-y-8'>
              {reviews.map(review => (
                <div key={review.id} className='border-b border-gray-100 pb-6 last:border-0'>
                  <div className='flex items-start gap-4'>
                    <img 
                      src={review.image} 
                      alt={review.user} 
                      className='w-12 h-12 rounded-full object-cover'
                    />
                    <div className='flex-1'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <h4 className='font-medium text-gray-800'>{review.user}</h4>
                          <div className='flex items-center mt-1'>
                            {renderStars(review.rating)}
                            <span className='text-xs text-gray-500 ml-2'>{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className='mt-2 text-gray-600'>{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className='mt-8'>
                <h3 className='text-lg font-medium text-gray-800 mb-4'>Write a Review</h3>
                <form className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-600'>Your Rating:</span>
                    <div className='flex'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button type="button" key={star} className="text-yellow-400 hover:text-yellow-500 focus:outline-none">
                          <FaStar />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <textarea 
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent' 
                      rows="4" 
                      placeholder="Share your thoughts about this product..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className='px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300'
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className='flex justify-center items-center h-64'>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  )
}

export default Product