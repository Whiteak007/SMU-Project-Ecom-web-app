import React from 'react'
import NewsletterBox from '../components/NewsletterBox'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import { FaMapMarkerAlt, FaPhone, FaBriefcase, FaArrowRight } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-400 to-blue-300 py-12 rounded-b-full text-white">
        <div className="container mx-auto px-4">
          <div className='text-center'>
            <Title text1={'CONTACT'} text2={'US'} />
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Reach out to our team anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16">
        <div className='flex flex-col lg:flex-row gap-12 items-center'>
          <div className="w-full lg:w-1/2 relative group">
            <img 
              className='w-full rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500' 
              src={assets.contact_img} 
              alt="Contact Us" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
          </div>
          
          <div className='w-full lg:w-1/2 space-y-8'>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Store</h2>
              
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Address</p>
                  <p className="text-gray-500">54709 Willms Station Suite 350, Washington</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Phone</p>
                  <p className="text-gray-500">Tel: (415) 555-0132</p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaBriefcase className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Careers at Forever</h3>
                    <p className="text-gray-500 mb-4">
                      Learn more about our teams and job openings.
                    </p>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Apply Now <FaArrowRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form (Added for better UX) */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea 
                    rows="4" 
                    placeholder="Your Message" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact