import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  
  Mail, 
  MapPin, 
  Facebook, 
  X, 
  Instagram, 
  Linkedin, 
  ArrowUp,
  ChevronRight
} from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>
      <div className="absolute top-0 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-4 lg:gap-6">
          {/* Company Info - Wider column */}
          <div className="lg:col-span-5 space-y-3 lg:space-y-4">
            <Link to="/" className="flex items-center mb-2 lg:mb-3">
              <img 
                src="/SmartBrew Neon logo-01.png" 
                alt="SMARTBREW Logo" 
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain" 
              />
            </Link>
            <div className="text-gray-400 text-sm leading-relaxed">
              <p className="mb-2 lg:mb-3 whitespace-pre-line">
                {"Revolutionizing the future of performance where\nintelligent tech, data integrity, and human potenti-\nal converge to transform how the world sells, \nengages, and creates impact."}
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-1">
              <a href="https://www.facebook.com/profile.php?id=61576191339748" target="_blank" rel="noopener noreferrer" 
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300">
                <Facebook size={14} className="text-gray-300" />
              </a>
              <a href="https://x.com/smartbrewnow" target="_blank" rel="noopener noreferrer" 
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300">
                <X size={14} className="text-gray-300" />
              </a>
              <a href="https://instagram.com/smartbrewnow" target="_blank" rel="noopener noreferrer" 
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300">
                <Instagram size={14} className="text-gray-300" />
              </a>
              <a href="https://www.linkedin.com/company/smartbrewnow" target="_blank" rel="noopener noreferrer" 
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-800 hover:bg-blue-500 flex items-center justify-center transition-all duration-300">
                <Linkedin size={14} className="text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-base lg:text-lg font-semibold text-gray-300 mb-2 pb-1 border-b border-gray-800">Quick Links</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-base lg:text-lg font-semibold text-gray-300 mb-2 pb-1 border-b border-gray-800">Our Services</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  Smart Brewing
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  AI Integration
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <ChevronRight size={16} className="mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform" />
                  Fundraising
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 sm:col-span-2 lg:col-span-3">
            <h4 className="text-base lg:text-lg font-semibold text-gray-300 mb-2 pb-1 border-b border-gray-800">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={12} className="text-blue-400" />
                </div>
                <span className="text-gray-400 text-xs sm:text-sm flex-1 leading-tight break-words">
                  SMARTBREW Solutions, Space Creattors Heights, Mega Mall Gurgaon (3rd floor), Golf Course Rd, Sector 28, DLF Phase 1, Gurugram, Haryana 122022
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={12} className="text-blue-400" />
                </div>
                <div className="text-gray-400 text-xs sm:text-sm flex-1 break-words">
                  <p>Contact: <a href="mailto:contact@smartbrew.in" className="text-blue-400 hover:underline break-all">contact@smartbrew.in</a></p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-10 pt-3 sm:pt-4 lg:pt-5 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-2 md:mb-0">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} SMARTBREW. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4 sm:space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-2 sm:p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg z-10 hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={16} className="text-white" />
      </motion.button>
    </footer>
  );
};

export default Footer;