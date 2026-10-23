import React from 'react';
import { assets } from '../assets/frontend_assets/assets.js';
const Footer = () => {
  return (
    <footer className='bg-gray-50 text-gray-600 md:mt-6'>
      {/* Use a standard container for consistent padding and centering. */}
      <div className='container mx-auto px-6 py-12 md:py-16'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          
          {/* Section 1: Brand and Social Links */}
          <div className='sm:col-span-2 lg:col-span-1'>
            {/* Replaced the image import with a placeholder URL */}
            <img src={assets.logo2} alt="Company Logo" className='w-32 mb-4' />
            <p className='text-sm leading-relaxed'>
              Shop the latest trends and timeless styles at our store. We're dedicated to providing high-quality, fashionable apparel for every occasion.
            </p>
            <div className='flex items-center gap-4 mt-6'>
              {/* Icons are now wrapped in links and have hover effects for better interactivity. */}
              <a href="#" aria-label="Instagram" className='text-gray-500 hover:text-gray-900 transition-colors'>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm9.5 1a4 4 0 11-4 4 4 4 0 014-4zm0 1.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zm3.5-.75a.75.75 0 11.75-.75.75.75 0 01-.75.75z" /></svg>
              </a>
              <a href="#" aria-label="Facebook" className='text-gray-500 hover:text-gray-900 transition-colors'>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 9H15V6.5h-1.5c-1.933 0-3.5 1.567-3.5 3.5v1.5H8v3h2.5V21h3v-7.5H16l.5-3h-3z" /></svg>
              </a>
              <a href="#" aria-label="Twitter" className='text-gray-500 hover:text-gray-900 transition-colors'>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.92a8.2 8.2 0 01-2.36.65A4.1 4.1 0 0021.4 4a8.27 8.27 0 01-2.6 1A4.14 4.14 0 0016 4a4.15 4.15 0 00-4.15 4.15c0 .32.04.64.1.94a11.75 11.75 0 01-8.52-4.32 4.14 4.14 0 001.29 5.54A4.1 4.1 0 013 10v.05a4.15 4.15 0 003.33 4.07 4.12 4.12 0 01-1.87.07 4.16 4.16 0 003.88 2.89A8.33 8.33 0 012 19.56a11.72 11.72 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.18 8.18 0 0022 5.92z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className='text-gray-500 hover:text-gray-900 transition-colors'>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" /></svg>
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            {/* Use <h3> for headings. Adjusted font size and weight. */}
            <h3 className='text-base font-semibold text-gray-900'>QUICK LINKS</h3>
            <ul className='mt-4 space-y-3 text-sm'>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>Shop All</a></li>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>New Arrivals</a></li>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>Sale</a></li>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>Our Story</a></li>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>Gift Cards</a></li>
            </ul>
          </div>

          {/* Section 3: Customer Care */}
          <div>
            <h3 className='text-base font-semibold text-gray-900'>CUSTOMER CARE</h3>
            <ul className='mt-4 space-y-3 text-sm'>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>Shipping & Returns</a></li>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>Size Guide</a></li>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>FAQ</a></li>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>Contact Us</a></li>
              <li><a href="#" className='hover:text-gray-900 hover:underline transition-colors'>Store Locator</a></li>
            </ul>
          </div>

          {/* Section 4: Newsletter Signup */}
          <div>
            <h3 className='text-base font-semibold text-gray-900'>STAY IN TOUCH</h3>
            <p className='mt-4 text-sm'>
              Join our mailing list for exclusive offers, new product announcements, and style inspiration.
            </p>
            {/* Improved form styling, including focus states for accessibility. */}
            <div className='flex items-center mt-4'>
              <input 
                type="email" 
                className='w-full bg-white rounded-l-md border border-gray-300 h-10 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500' 
                placeholder='Your email' 
              />
              <button className='flex items-center justify-center bg-black h-10 w-10 aspect-square rounded-r-md hover:bg-gray-800 transition-colors'>
                <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <hr className='border-gray-200 mt-10' />
        <div className='flex flex-col md:flex-row items-center justify-between pt-6 text-sm'>
          <p>&copy; {new Date().getFullYear()} Coderak_.com. All rights reserved.</p>
          <ul className='flex items-center gap-4 mt-4 md:mt-0'>
            <li><a href="#" className='hover:text-gray-900 hover:underline'>Privacy Policy</a></li>
            <li><a href="#" className='hover:text-gray-900 hover:underline'>Terms of Service</a></li>
            <li><a href="#" className='hover:text-gray-900 hover:underline'>Site Map</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
