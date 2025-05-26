import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductTestimonial: React.FC = () => {
  return (
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Quote className="text-primary-500/20 w-16 h-16 mb-6" />
              
              <blockquote className="text-2xl font-medium text-gray-200 leading-relaxed mb-8">
                "Implementing TechSales' DataInsights Pro transformed our business intelligence capabilities. The platform's intuitive interface and powerful analytics have enabled our team to make data-driven decisions with confidence."
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/Employees/Giridhar.jpg" 
                    alt="Chief Data Officer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Chief Data Officer</p>
                  <p className="text-primary-400 text-sm">SmartBrew Solutions</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="glass-card p-8"
            >
              <h3 className="text-2xl font-semibold mb-6">Ready to experience our products?</h3>
              
              <p className="text-gray-300 mb-6">
                Our solutions are designed to meet the unique needs of your business. Contact us today to discuss how we can help you achieve your technology and sales goals.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary-500">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Schedule a Demo</h4>
                    <p className="text-gray-400">See our products in action with a personalized demonstration.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary-500">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Consultation</h4>
                    <p className="text-gray-400">Our experts will analyze your needs and recommend solutions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary-500">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Implementation</h4>
                    <p className="text-gray-400">Seamless setup and integration with your existing systems.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/contact" className="btn btn-primary w-full justify-center">
                  Get Started
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTestimonial;