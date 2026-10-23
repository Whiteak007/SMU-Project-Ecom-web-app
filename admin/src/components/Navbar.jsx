import React from 'react';
import { assets } from '../assets/admin_assets/assets.js';
import { toast } from 'react-toastify';
import { FiLogOut, FiMenu, FiX, FiBell, FiMessageSquare } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const Navbar = ({ setToken, toggleMobileSidebar, isMobileSidebarOpen }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/add': return 'Add Product';
      case '/list': return 'Product List';
      case '/orders': return 'Order Management';
      default: return 'Dashboard';
    }
  }

  const handleLogout = () => {
    setToken('');        
    toast.success("Logged out successfully!");
  };

  return (
    <header className="bg-white shadow-sm py-3 px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left Side - Menu Button and Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right Side - Icons and Profile */}
        <div className="flex items-center space-x-4">
          
          <div className="hidden md:flex items-center space-x-2">
            <img 
              src="https://cdn.getmerlin.in/cms/pfp3_d7855f9562.webp" 
              alt="Admin" 
              className="h-8 w-8 rounded-full object-cover border-2 border-indigo-200"
            />
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
          
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all duration-300"
          >
            <FiLogOut className="text-lg" />
            <span className="hidden sm:inline-block text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;