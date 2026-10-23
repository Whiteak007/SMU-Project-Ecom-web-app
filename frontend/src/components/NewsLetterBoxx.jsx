import React from 'react';
import { FiX, FiShoppingBag, FiTag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const NewsLetterBoxx = () => {
    const navigate = useNavigate();
    const handleNavLinkClick = () => {
        navigate('/collection');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    return (
        <div className="relative max-w-6xl mx-4 md:mt-20 md:mx-auto my-8 overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
            {/* Gradient Background for Mobile */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-20"></div>
            
            <div className="md:grid md:grid-cols-2 bg-white">
                {/* Image Section */}
                <div className="relative">
                    <img 
                        src="https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/5276346/2018/5/7/11525685059588-Mast--Harbour-Men-Olive-Green-Slim-Fit-Solid-Casual-Shirt-6551525685059411-1.jpg"
                        alt="promotional" 
                        className="hidden md:block w-full h-full object-cover rounded-l-2xl"
                    />
                    {/* Mobile Image Alternative */}
                    <div className="md:hidden absolute -bottom-10 -left-10 opacity-10">
                        <FiShoppingBag className="text-[200px] text-blue-900" />
                    </div>
                </div>
                
                {/* Content Section */}
                <div className="relative flex items-center justify-center py-12 px-6 md:px-10">
                    
                    <div className="text-center max-w-md mx-auto">
                        {/* Discount Tag Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FiTag className="text-blue-600 text-2xl" />
                            </div>
                        </div>
                        
                        {/* Heading */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                Don't miss out
                            </span> on our discounted products.
                        </h1>
                        
                        {/* Description */}
                        <p className="mt-4 text-gray-600 text-lg">
                            Don't miss out on amazing discounts — shop now before they're gone!
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-3">
                            <button
                                onClick={handleNavLinkClick}
                                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium 
                                shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                            >
                                Check out the products
                            </button>
                            <button 
                                className="px-6 py-3 text-gray-600 font-medium hover:text-gray-800 
                                transition-colors duration-200 underline underline-offset-4"
                            >
                                No thanks, I don't want discounts
                            </button>
                        </div>
                        
                        {/* Additional Info */}
                        <p className="mt-6 text-sm text-gray-500">
                            Limited time offer. Prices go back up soon!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetterBoxx;