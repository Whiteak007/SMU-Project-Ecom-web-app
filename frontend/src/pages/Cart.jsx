import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleNavLinkClick = () => {
    navigate('/place-order')
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cart Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-300"
        >
          <FaArrowLeft /> Continue Shopping
        </button>
        <div className="text-center">
          <Title text1={'YOUR'} text2={'CART'} />
          <p className="text-gray-500 text-sm mt-1">
            {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <HiOutlineShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-md"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Size</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {/* Cart Items List */}
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div 
                  key={index} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-start gap-4">
                    <img 
                      className="w-20 h-20 object-contain rounded-md border border-gray-200" 
                      src={productData.image[0]} 
                      alt={productData.name} 
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{productData.name}</h3>
                      <p className="text-orange-500 font-medium mt-1">{currency}{productData.price}</p>
                    </div>
                  </div>

                  {/* Size */}
                  <div className="md:col-span-2 flex items-center">
                    <span className="md:hidden text-gray-500 mr-2">Size:</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                      {item.size}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    <span className="md:hidden text-gray-500">Quantity:</span>
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus size={12} />
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          updateQuantity(item._id, item.size, Math.max(1, value));
                        }}
                        className="w-12 text-center border-x border-gray-200 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="md:col-span-2 flex items-center justify-between">
                    <div className="font-medium text-gray-800">
                      {currency}{(productData.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Have a coupon code?</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Enter coupon code" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <button className="px-6 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 transition-colors duration-300">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <CartTotal />
              <button 
                onClick={handleNavLinkClick}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;