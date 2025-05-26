import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesHero: React.FC = () => {
  const handleTechClick = () => {
    // Scroll to services section
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    // Trigger tech filter after a short delay
    setTimeout(() => {
      const techButton = document.querySelector('[data-filter="tech"]') as HTMLButtonElement;
      if (techButton) {
        techButton.click();
      }
    }, 500);
  };

  const handleSalesClick = () => {
    // Scroll to services section
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    // Trigger sales filter after a short delay
    setTimeout(() => {
      const salesButton = document.querySelector('[data-filter="sales"]') as HTMLButtonElement;
      if (salesButton) {
        salesButton.click();
      }
    }, 500);
  };

  return (
    <section className="pt-32 pb-20 bg-dark-950 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-screen filter blur-[80px] animate-blob" />
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary-500 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-gradient">Services</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We offer comprehensive solutions that combine cutting-edge technology with sales expertise to help businesses thrive in the digital era.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={handleTechClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
            >
              Technology Solutions
              <ArrowRight size={16} className="ml-2" />
            </button>
            <button 
              onClick={handleSalesClick}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center transition-all"
            >
              Sales Solutions
              <ArrowRight size={16} className="ml-2" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;