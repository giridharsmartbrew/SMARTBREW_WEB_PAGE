import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProductFeatures: React.FC = () => {
  const features = [
    "AI-powered analytics and insights",
    "Cloud-based infrastructure with 99.9% uptime",
    "Enterprise-grade security protocols",
    "Real-time collaboration and sharing",
    "Custom reporting and dashboards",
    "Seamless integration with existing systems",
    "Mobile-friendly access on any device",
    "Automated alerts and notifications",
    "Data-driven forecasting and predictions",
    "Regular updates and enhancements",
    "Personalized onboarding and training",
    "24/7 technical support"
  ];

  return (
    <section className="py-20 bg-dark-950 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-radial from-primary-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Common Features Across Our Solutions
          </h2>
          <p className="text-lg text-gray-400">
            All of our products are built with these core capabilities for maximum performance and value
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3 glass-card p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <CheckCircle className="text-primary-500 flex-shrink-0 mt-0.5" size={20} />
              <span>{feature}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <motion.p 
            className="text-xl text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Want to learn more about our product features and how they can benefit your business?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a href="/contact" className="btn btn-primary px-8 py-3">
              Request a Demo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;