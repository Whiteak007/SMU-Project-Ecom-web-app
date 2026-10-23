import React, { useState } from 'react'
import axios from 'axios'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import { FaCreditCard, FaMoneyBillWave, FaLock, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa'
import { SiRazorpay, SiStripe } from 'react-icons/si'

const PlaceOrder = () => {
  const handleNavLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {headers:{token}})
          if(data.success){
            setCartItems({})
            navigate('/orders')
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({});
            toast.success('Order placed successfully!')
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break
        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side - Delivery Information */}
        <div className="flex-1">
          <div className="mb-8">
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            <p className="text-gray-500 mt-2">Please fill in your delivery details</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-800 mb-4">
                <FaUser className="text-orange-500" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='firstName' 
                    value={formData.firstName} 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                    type="text" 
                    placeholder='First Name' 
                  />
                  <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                <div className="relative">
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='lastName' 
                    value={formData.lastName} 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                    type="text" 
                    placeholder='Last Name' 
                  />
                  <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
              <div className="relative mt-4">
                <input 
                  required 
                  onChange={onChangeHandler} 
                  name='email' 
                  value={formData.email} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                  type="email" 
                  placeholder='Email Address' 
                />
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              <div className="relative mt-4">
                <input 
                  required 
                  onChange={onChangeHandler} 
                  name='phone' 
                  value={formData.phone} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                  type="number" 
                  placeholder='Contact Number' 
                />
                <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-800 mb-4">
                <FaHome className="text-orange-500" /> Address Information
              </h3>
              <div className="relative">
                <input 
                  required 
                  onChange={onChangeHandler} 
                  name='street' 
                  value={formData.street} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                  type="text" 
                  placeholder='Street Address' 
                />
                <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='city' 
                    value={formData.city} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                    type="text" 
                    placeholder='City' 
                  />
                </div>
                <div>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='state' 
                    value={formData.state} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                    type="text" 
                    placeholder='State' 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='zipcode' 
                    value={formData.zipcode} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                    type="number" 
                    placeholder='Zip Code' 
                  />
                </div>
                <div>
                  <input 
                    required 
                    onChange={onChangeHandler} 
                    name='country' 
                    value={formData.country} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
                    type="text" 
                    placeholder='Country' 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary & Payment */}
        <div className="lg:w-96">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <div className="mb-8">
              <Title text1={'ORDER'} text2={'SUMMARY'} />
            </div>
            
            <CartTotal />

            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <Title text1={'PAYMENT'} text2={'METHOD'} />
                <div className="flex items-center gap-2 text-green-500">
                  <FaLock />
                  <span className="text-sm">Secure Payment</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <div 
                  onClick={() => setMethod('stripe')} 
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${method === 'stripe' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'stripe' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                    {method === 'stripe' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <div className="flex items-center gap-3">
                    <SiStripe className="text-indigo-600 text-2xl" />
                    <span className="font-medium">Stripe</span>
                  </div>
                </div>

                <div 
                  onClick={() => setMethod('razorpay')} 
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${method === 'razorpay' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'razorpay' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                    {method === 'razorpay' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <div className="flex items-center gap-3">
                    <SiRazorpay className="text-blue-500 text-2xl" />
                    <span className="font-medium">Razorpay</span>
                  </div>
                </div>

                <div 
                  onClick={() => setMethod('cod')} 
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${method === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                    {method === 'cod' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-green-500 text-xl" />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                </div>
              </div>

              <button 
              onClick={handleNavLinkClick}
                type='submit' 
                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                PLACE ORDER
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
                <FaLock className="text-green-500" />
                <span>Your payment information is processed securely.</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder