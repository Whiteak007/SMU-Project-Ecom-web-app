import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiRefreshCw, FiPackage, FiCheckCircle, FiTruck, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const statusIcons = {
    'pending': <FiClock className="text-yellow-500" />,
    'processing': <FiRefreshCw className="text-blue-500 animate-spin" />,
    'shipped': <FiTruck className="text-indigo-500" />,
    'delivered': <FiCheckCircle className="text-green-500" />,
    'cancelled': <FiPackage className="text-red-500" />
  };

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-indigo-100 text-indigo-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  const loadOrderData = async () => {
    try {
      setIsLoading(true);
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Title text1={'MY'} text2={'ORDERS'} />
          <p className="mt-2 text-gray-600">View and manage all your orders in one place</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : orderData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {orderData.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      className="w-24 h-24 rounded-lg object-cover border border-gray-200" 
                      src={item.image[0]} 
                      alt={item.name} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
                          <p>Price: <span className="font-medium">{currency}{item.price}</span></p>
                          <p>Qty: <span className="font-medium">{item.quantity}</span></p>
                          <p>Size: <span className="font-medium">{item.size}</span></p>
                        </div>
                      </div>
                      
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
                        {statusIcons[item.status.toLowerCase()] || <FiPackage />}
                        <span className="ml-2 capitalize">{item.status.toLowerCase()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Order Date</p>
                        <p className="font-medium">{new Date(item.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Payment Method</p>
                        <p className="font-medium capitalize">{item.paymentMethod.toLowerCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={loadOrderData}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      <FiRefreshCw className="mr-2" />
                      Refresh Status
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                      Track Order
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Order ID: <span className="font-mono text-gray-700">{index + 1000}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;