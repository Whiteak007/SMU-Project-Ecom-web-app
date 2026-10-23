import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {text1}
          </span>{' '}
          <span className="text-gray-800">{text2}</span>
        </h2>
        <div className="hidden sm:block relative">
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          <div className="absolute -bottom-1 left-0 w-4 h-1 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 rounded-full"></div>
    </div>
  )
}

export default Title