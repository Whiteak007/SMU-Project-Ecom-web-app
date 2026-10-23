import React from "react";
import { FiTruck, FiRefreshCw, FiHeadphones } from "react-icons/fi";

const OurPolicy = () => {
  const policies = [
    {
      icon: <FiTruck className="w-10 h-10 text-orange-500" />,
      title: "Free Shipping",
      description: "Free delivery for all orders over $50",
    },
    {
      icon: <FiRefreshCw className="w-10 h-10 text-orange-500" />,
      title: "Easy Returns",
      description: "7 days hassle-free return policy",
    },
    {
      icon: <FiHeadphones className="w-10 h-10 text-orange-500" />,
      title: "24/7 Support",
      description: "Dedicated customer support",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {policies.map((policy, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-orange-50">
                {policy.icon}
              </div>
              <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
                {policy.title}
              </h3>
              <p className="text-center text-gray-500">
                {policy.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;