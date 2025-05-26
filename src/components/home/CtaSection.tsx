import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-900 to-primary-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-primary-500/10 top-0 right-0"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-secondary-500/10 bottom-0 left-0"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center glass-card p-8 md:p-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Business?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the companies that are already leveraging our technology solutions and sales expertise to stay ahead of the competition.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/contact" className="btn btn-secondary px-8 py-3">
              Schedule a Consultation
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link to="/services" className="btn btn-dark px-8 py-3">
              Explore Our Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;