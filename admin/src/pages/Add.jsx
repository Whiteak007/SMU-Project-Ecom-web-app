import React, { useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/admin_assets/assets.js'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'
import { FiUpload, FiPlus, FiCheck } from 'react-icons/fi'

const Add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {headers: {token}});
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setCategory('Men')
        setSubCategory('Topwear')
        setBestseller(false)
        setSizes([])
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
      <form onSubmit={onSubmitHandler} className='space-y-6'>
        {/* Image Upload Section */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Product Images</label>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((num) => {
              const imageState = num === 1 ? image1 : num === 2 ? image2 : num === 3 ? image3 : image4;
              const setImage = num === 1 ? setImage1 : num === 2 ? setImage2 : num === 3 ? setImage3 : setImage4;
              
              return (
                <label 
                  key={num}
                  htmlFor={`image${num}`}
                  className={`relative group cursor-pointer flex items-center justify-center h-32 border-2 border-dashed rounded-lg overflow-hidden transition-all duration-300 ${
                    imageState ? 'border-indigo-500' : 'border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  {imageState ? (
                    <>
                      <img 
                        className="w-full h-full object-cover" 
                        src={URL.createObjectURL(imageState)} 
                        alt={`Preview ${num}`}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <FiUpload className="text-white text-xl" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <FiUpload className="text-2xl mb-2" />
                      <span className="text-xs">Upload Image {num}</span>
                    </div>
                  )}
                  <input 
                    onChange={(e) => setImage(e.target.files[0])} 
                    type="file" 
                    id={`image${num}`} 
                    className="hidden" 
                    accept="image/*"
                  />
                </label>
              )
            })}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Product Name</label>
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300' 
            type='text' 
            placeholder='Enter product name' 
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Product Description</label>
          <textarea 
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-h-[100px]' 
            placeholder='Enter detailed product description' 
            required
          />
        </div>

        {/* Product Details Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Category */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              value={category}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300'
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Sub Category</label>
            <select 
              onChange={(e) => setSubCategory(e.target.value)} 
              value={subCategory}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300'
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Price ($)</label>
            <input 
              onChange={(e) => setPrice(e.target.value)} 
              value={price} 
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300' 
              type="number" 
              placeholder='25.00' 
              min="0" 
              step="0.01" 
              required 
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Available Sizes</label>
          <div className='flex flex-wrap gap-2'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => 
                  prev.includes(size) 
                    ? prev.filter(item => item !== size) 
                    : [...prev, size]
                )}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                  sizes.includes(size)
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className='flex items-center'>
          <div className="relative flex items-center">
            <input 
              onChange={() => setBestseller(prev => !prev)} 
              checked={bestseller} 
              type="checkbox" 
              id="bestseller" 
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full transition-all duration-300 ${bestseller ? 'bg-indigo-600' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${bestseller ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>
          <label 
            htmlFor="bestseller" 
            className='ml-3 text-sm font-medium text-gray-700 cursor-pointer'
          >
            Mark as Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 ${
            isSubmitting 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
          } flex items-center justify-center`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FiPlus className="mr-2" />
              Add Product
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default Add