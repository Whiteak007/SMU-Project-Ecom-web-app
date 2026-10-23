import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/frontend_assets/assets.js";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const [profileOpen, setProfileOpen] = useState(false);

  // Function to handle the scroll-to-top feature
  const handleNavLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setProfileOpen(false);
  }

  const navLinks = [
    { path: "/", name: "HOME" },
    { path: "/collection", name: "COLLECTION" },
    { path: "/about", name: "ABOUT" },
    { path: "/contact", name: "CONTACT" }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center"
            onClick={handleNavLinkClick} // Added scroll-to-top to logo
          >
            <img
              src={assets.logo1}
              className="h-36 w-40"
              alt="logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavLinkClick} // Added scroll-to-top on click
                className={({ isActive }) =>
                  `px-1 py-2 text-sm font-medium border-b-2 transition-colors duration-300 ${isActive
                    ? 'border-orange-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {/* <a className="border border-gray-600 p-2.5 rounded-2xl" href="https://ecommerce-admin-plum-ten.vercel.app/" target="_blank">Admin Pannel</a> */}
            <a
              href="https://ecommerce-admin-plum-ten.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-600 text-sm font-medium rounded-2xl bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 transition-transform"
            >
              Admin Panel
            </a>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => setShowSearch(true)}
              className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => token ? setProfileOpen(!profileOpen) : navigate('/login')}
                className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
              >
                <FiUser className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {profileOpen && token && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <button
                      onClick={() => {
                        navigate('/my-profile');
                        setProfileOpen(false);
                        handleNavLinkClick(); // Added scroll-to-top for profile link
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/orders');
                        setProfileOpen(false);
                        handleNavLinkClick(); // Added scroll-to-top for orders link
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/cart" className="relative p-1 text-gray-500 hover:text-gray-700" onClick={handleNavLinkClick}>
              <FiShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setVisible(true)}
              className="md:hidden p-1 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-lg z-50 md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <button
                onClick={() => setVisible(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
              <div className="text-lg font-medium text-gray-900">Menu</div>
              <div className="w-6"></div> {/* Spacer for alignment */}
            </div>

            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    setVisible(false);
                    handleNavLinkClick(); // Combined the existing function with the new scroll-to-top
                  }}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {token ? (
              <div className="px-4 py-3 border-t">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setVisible(false);
                    handleNavLinkClick(); // Added scroll-to-top for mobile profile link
                  }}
                  className="block w-full px-3 py-2 rounded-md text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/orders');
                    setVisible(false);
                    handleNavLinkClick(); // Added scroll-to-top for mobile orders link
                  }}
                  className="block w-full px-3 py-2 rounded-md text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </button>
                <button
                  onClick={logout}
                  className="block w-full px-3 py-2 rounded-md text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 border-t">
                <button
                  onClick={() => {
                    navigate('/login');
                    setVisible(false);
                    handleNavLinkClick(); // Added scroll-to-top for mobile login link
                  }}
                  className="block w-full px-3 py-2 rounded-md text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Login
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
