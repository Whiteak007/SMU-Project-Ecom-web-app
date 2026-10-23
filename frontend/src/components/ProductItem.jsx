import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { FaHeart, FaStar } from 'react-icons/fa'

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToWishlist, wishlistItems } = useContext(ShopContext);
  const isWishlisted = wishlistItems?.some(item => item._id === id);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${id}`} className="block">
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square">
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            src={image[0]} 
            alt={name} 
          />
          {/* Wishlist Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToWishlist(id);
            }}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FiHeart className="text-gray-400 group-hover:text-red-500" />
            )}
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-gray-800 font-medium mb-1 line-clamp-1">{name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              {currency}{price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-gray-500 text-sm ml-1">4.5</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem