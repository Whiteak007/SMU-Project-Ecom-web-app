import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden lg:flex lg:items-center">
      {/* Left section: Text content */}
      <div className="w-full lg:w-1/2 py-12 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-md mx-auto lg:max-w-none lg:mx-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-orange-500"></div>
            <p className="text-sm font-medium tracking-wider text-orange-500 uppercase">
              Our Bestsellers
            </p>
          </div>

          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Discover Our</span>
            <span className="block text-orange-500">New Collection</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-lg">
            Elevate your style with our premium quality fashion pieces. Limited time offer - get 20% off your first purchase.
          </p>

          <div className="mt-5 sm:mt-8">
            <Link
              to="/collection" // Changed href="#" to to="/shop-now"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow"
            >
              Shop Now <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right section: Image */}
      <div className="w-full lg:w-1/2">
        <img
          className="h-96 w-full object-cover sm:h-auto lg:h-full"
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Latest fashion arrivals"
        />
      </div>
    </div>
  );
};

export default Hero;