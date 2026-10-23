import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/admin_assets/assets'
import { toast } from 'react-toastify'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  const fetchAllOrders = async () => {
    if (!token) return
    
    setIsLoading(true)
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status', 
        { orderId, status: event.target.value }, 
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(`Order status updated to ${event.target.value}`)
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase().includes(filter.toLowerCase()))

  const getStatusColor = (status) => {
    switch(status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800'
      case 'Packing': return 'bg-yellow-100 text-yellow-800'
      case 'Shipped': return 'bg-purple-100 text-purple-800'
      case 'Out for delivery': return 'bg-orange-100 text-orange-800'
      case 'Delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Order Placed': return <FiClock className="mr-1" />
      case 'Packing': return <FiPackage className="mr-1" />
      case 'Shipped': return <FiTruck className="mr-1" />
      case 'Out for delivery': return <FiTruck className="mr-1" />
      case 'Delivered': return <FiCheckCircle className="mr-1" />
      default: return <FiClock className="mr-1" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 appearance-none"
            >
              <option value="all">All Orders</option>
              <option value="placed">Order Placed</option>
              <option value="packing">Packing</option>
              <option value="shipped">Shipped</option>
              <option value="delivery">Out for delivery</option>
              <option value="delivered">Delivered</option>
            </select>
            <div className="absolute right-3 top-2.5 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <button
            onClick={fetchAllOrders}
            disabled={isLoading}
            className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors duration-300"
            title="Refresh"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div 
                key={order._id} 
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <FiPackage className="text-indigo-500 mr-2" />
                    <span className="font-medium text-gray-700">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                  {/* Order Items */}
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Items ({order.items.length})</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-12 rounded-md object-cover mr-3 border border-gray-200"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} × {currency}{item.price} • Size: {item.size}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Customer</h3>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{order.address.phone}</p>
                      <p className="text-xs text-gray-500">{order.address.email || 'No email provided'}</p>
                    </div>
                    <h3 className="text-sm font-medium text-gray-700 mt-3 mb-2">Shipping Address</h3>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>{order.address.street}</p>
                      <p>{order.address.city}, {order.address.state}</p>
                      <p>{order.address.country}, {order.address.zipcode}</p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">{currency}{order.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium">{currency}0.00</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="text-gray-600 font-medium">Total:</span>
                        <span className="font-bold text-indigo-600">{currency}{order.amount}</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <FiDollarSign className="text-gray-500 mr-2" />
                        <span className="text-sm">
                          Payment: 
                          <span className={`ml-1 font-medium ${
                            order.payment ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {order.payment ? 'Completed' : 'Pending'}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiTruck className="text-gray-500 mr-2" />
                        <span className="text-sm">Method: {order.paymentMethod}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                      <select 
                        onChange={(event) => statusHandler(event, order._id)} 
                        value={order.status} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all' ? 'You have no orders yet.' : `No orders with status "${filter}" found.`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Orders