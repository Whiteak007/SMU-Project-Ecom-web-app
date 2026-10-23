import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonial = () => {
  // Testimonial data array
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'This product has completely transformed our workflow. The efficiency gains are incredible and our team loves using it daily.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO, TechStart',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'Exceptional service and support. The implementation was seamless and the results have exceeded our expectations.',
      rating: 4
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Small Business Owner',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      content: 'As a small business, we needed an affordable solution that packed powerful features. This delivered on all fronts!',
      rating: 5
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Product Manager',
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
      content: 'The intuitive interface reduced our training time by 60%. Our adoption rates are through the roof!',
      rating: 5
    },
    {
      id: 5,
      name: 'Priya Patel',
      role: 'UX Designer',
      image: 'https://randomuser.me/api/portraits/women/25.jpg',
      content: 'Beautifully designed with attention to detail. It makes complex tasks feel simple and enjoyable.',
      rating: 4
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const testimonialRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Render star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < rating ? 
      <FaStar key={i} className="text-yellow-400 text-lg" /> : 
      <FaRegStar key={i} className="text-yellow-400 text-lg" />
    ));
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br md:mt-16 from-gray-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">What Our Clients Say</span>
            <span className="block text-blue-600 mt-2">Trusted by businesses worldwide</span>
          </h2>
        </div>

        <div 
          ref={testimonialRef}
          className="relative h-96 md:h-80 w-full overflow-hidden"
        >
          {/* Testimonial Cards */}
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === activeIndex
                  ? 'translate-x-0 opacity-100 z-10'
                  : index < activeIndex
                  ? '-translate-x-full opacity-0'
                  : 'translate-x-full opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col justify-between max-w-3xl mx-auto">
                <div>
                  <FaQuoteLeft className="text-blue-200 text-4xl mb-4" />
                  <p className="text-gray-600 text-lg md:text-xl italic mb-6">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full object-cover border-4 border-blue-100"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-blue-600">{testimonial.role}</div>
                    <div className="flex mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-white shadow-md text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-white shadow-md text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;