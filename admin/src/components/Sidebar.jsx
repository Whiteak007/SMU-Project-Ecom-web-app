import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FiPlus, FiList, FiShoppingBag, FiHome, FiSettings, FiUsers, FiX, FiMenu } from 'react-icons/fi'
import { FaChartLine } from 'react-icons/fa'

const Sidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
  const location = useLocation()
  const [isClosing, setIsClosing] = useState(false)

  // Check if current route is active
  const isActive = (path) => location.pathname === path

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobileSidebarOpen) {
      const timer = setTimeout(() => {
        toggleMobileSidebar()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      toggleMobileSidebar()
      setIsClosing(false)
    }, 300)
  }

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed md:hidden z-30 bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
      >
        {isMobileSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-20 w-64 min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50 border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen 
            ? 'translate-x-0' 
            : '-translate-x-full md:translate-x-0'
          }
          ${isClosing ? 'translate-x-full' : ''}
        `}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Logo/Dashboard Header */}
          <div className="p-4 mb-6 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md">
            <div className="flex items-center gap-3">
              <FiHome className="text-xl" />
              <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            </div>
            <p className="text-xs opacity-80 mt-1">Manage your store efficiently</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            <NavLink 
              to='/add'
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isActive('/add') 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              <FiPlus className="text-lg" />
              <span className="font-medium">Add Products</span>
            </NavLink>

            <NavLink 
              to='/list'
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isActive('/list') 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              <FiList className="text-lg" />
              <span className="font-medium">Product List</span>
            </NavLink>

            <NavLink 
              to='/orders'
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isActive('/orders') 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              <FiShoppingBag className="text-lg" />
              <span className="font-medium">Orders</span>
              <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                3
              </span>
            </NavLink>

            {/* <NavLink 
              to='/customers'
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isActive('/customers') 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              <FiUsers className="text-lg" />
              <span className="font-medium">Customers</span>
            </NavLink> */}

            {/* <NavLink 
              to='/analytics'
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isActive('/analytics') 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              <FaChartLine className="text-lg" />
              <span className="font-medium">Analytics</span>
            </NavLink> */}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto">
            <NavLink 
              to='/settings'
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isActive('/settings') 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              <FiSettings className="text-lg" />
              <span className="font-medium">Settings</span>
            </NavLink>

            <div className="mt-4 p-3 text-center text-xs text-gray-500 bg-white rounded-lg shadow-inner">
              <p>Admin Panel</p>
              <p className="mt-1">© 2025 Coderak.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar