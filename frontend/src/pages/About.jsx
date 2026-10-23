import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { FaShieldAlt, FaClock, FaHeadset } from 'react-icons/fa'

const About = () => {
  const [dsta, setData] = useState(false);
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-400 to-blue-300 rounded-b-full py-12 text-white">
        <div className="container mx-auto px-4">
          <div className='text-center'>
            <Title text1={'ABOUT'} text2={'US'} />
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Discover the story behind Coderak and our commitment to excellence
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4 py-12">
        <div className='flex flex-col lg:flex-row gap-12 items-center'>
          <div className="w-full lg:w-1/2 relative group">
            <img 
              className='w-full rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500' 
              src={assets.about_img} 
              alt="About Coderak" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
          </div>
          
          <div className='w-full lg:w-1/2'>
            <div className='space-y-6 text-gray-700'>
              <p className="text-lg leading-relaxed">
                Coderak was born out of a passion for innovation and a desire to revolutionize. 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iusto dolorum nulla 
                quo pariatur suscipit consectetur sunt sit in nostrum reprehenderit numquam animi.
              </p>
              
              <p className="text-lg leading-relaxed">
                Since our inception, we've worked tirelessly to curate a diverse selection 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eligendi eaque 
                maxime asperiores commodi itaque dolorem dolorum obcaecati laboriosam explicabo.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className='text-xl font-bold text-gray-800 mb-3'>Our Mission</h3>
                <p className="text-gray-700">
                  Our mission at Coderak is to empower customers with choice, convenience, 
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi vero maxime 
                  magni deserunt dolore. Repudiandae illum reprehenderit sunt molestiae nostrum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className='text-center mb-12'>
            <Title text1={'WHY'} text2={'CHOOSE US'} />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service and quality products
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Quality Assurance Card */}
            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl duration-300 border-t-4 border-blue-500 transform hover:-translate-y-2 transition-transform'>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaShieldAlt className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Quality Assurance</h3>
              </div>
              <p className='text-gray-600'>
                We meticulously select and vet each product to ensure, Lorem ipsum dolor sit amet 
                consectetur adipisicing elit. Recusandae, id?
              </p>
            </div>

            {/* Convenience Card */}
            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl duration-300 border-t-4 border-purple-500 transform hover:-translate-y-2 transition-transform'>
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaClock className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Convenience</h3>
              </div>
              <p className='text-gray-600'>
                With our user-friendly interface and hassle-free, Lorem ipsum dolor sit amet 
                consectetur adipisicing elit. Recusandae, id?
              </p>
            </div>

            {/* Customer Service Card */}
            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl duration-300 border-t-4 border-green-500 transform hover:-translate-y-2 transition-transform'>
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaHeadset className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Exceptional Service</h3>
              </div>
              <p className='text-gray-600'>
                Our team of dedicated professionals is here to help, Lorem ipsum dolor sit amet 
                consectetur adipisicing elit. Recusandae, id?
              </p>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About