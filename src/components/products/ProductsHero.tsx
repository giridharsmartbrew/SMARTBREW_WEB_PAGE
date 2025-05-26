import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const ProductsHero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 bg-dark-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary-500/10"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-secondary-500/10"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-gradient">Products</span> & Solutions
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our innovative range of technology and sales solutions designed to drive your business forward in the digital era.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-10 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            <button className="sm:inline-flex items-center px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg hover:bg-dark-700 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              <span>Filter</span>
            </button>
          </motion.div>
          
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">All Products</span>
            <span className="px-3 py-1 bg-dark-800 text-gray-400 rounded-full text-sm hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors">Technology</span>
            <span className="px-3 py-1 bg-dark-800 text-gray-400 rounded-full text-sm hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors">Sales</span>
            <span className="px-3 py-1 bg-dark-800 text-gray-400 rounded-full text-sm hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors">Analytics</span>
            <span className="px-3 py-1 bg-dark-800 text-gray-400 rounded-full text-sm hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors">Cloud</span>
            <span className="px-3 py-1 bg-dark-800 text-gray-400 rounded-full text-sm hover:bg-primary-500/20 hover:text-primary-400 cursor-pointer transition-colors">Security</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;