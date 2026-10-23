import React from 'react';

const NewsletterBox = () => {
  // This is the original function. We're not changing the logic, just the UI.
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Form submitted with email:', event.target.email.value);
  };

  return (
    // The main container now has a more vibrant gradient, rounded corners,
    // a subtle shadow, and a transition for a smoother feel.
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 to-purple-700 p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl transform transition-all duration-500 ease-in-out">
      
      {/* Abstract shapes for visual interest */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Main heading with enhanced styling for better visual impact */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-wide">
          Subscribe Now & Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300 transform transition-transform duration-300 hover:scale-105 inline-block">20% Off</span>
        </h2>
        {/* Sub-heading with softer text color for contrast */}
        <p className="mt-4 text-sm sm:text-lg text-indigo-100 max-w-2xl mx-auto">
          Join our newsletter to receive exclusive deals, new product announcements, and helpful tips directly in your inbox.
        </p>

        <form onSubmit={onSubmitHandler} className="mt-8 mx-auto max-w-xl">
          {/* Input field container with improved layout */}
          <div className="relative flex flex-col sm:flex-row gap-4">
            {/* Email input with a professional appearance and a clear focus state */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Replaced react-icons with an inline SVG to resolve the compilation error */}
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-transparent text-base rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 shadow-sm"
                placeholder="Enter your email address"
              />
            </div>

            {/* Submit button with a professional gradient and eye-catching hover effects */}
            <button
              type="submit"
              className="w-full sm:w-auto flex-shrink-0 px-8 py-3 text-base font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Subscribe
            </button>
          </div>
        </form>

        {/* Privacy note with a lighter text color */}
        <p className="mt-6 text-xs sm:text-sm text-indigo-200">
          We respect your privacy. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterBox;
