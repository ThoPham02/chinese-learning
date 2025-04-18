import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-6 px-6 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © 2025 Chinese Learning Platform. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;