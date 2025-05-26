import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Database, Shield, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechServicesCta: React.FC = () => {
  return (
    <section id="tech" className="py-20 bg-gradient-to-br from-dark-900 to-primary-900/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L100,0 L100,100 L0,100 Z"
            fill="none"
            stroke="url(#tech-gradient)"
            vectorEffect="non-scaling-stroke"
            strokeWidth="0.5"
          ></path>
          <defs>
            <linearGradient id="tech-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1890ff" />
              <stop offset="100%" stopColor="#13c2c2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Technology Solutions That <span className="text-gradient">Drive Growth</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-6">
              Our technology solutions are designed to address your business needs, leveraging the latest innovations to give you a competitive edge.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <Server className="text-secondary-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Infrastructure Modernization</h4>
                  <p className="text-gray-400">Transform your legacy systems into agile, cloud-based infrastructure.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Database className="text-secondary-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Data-Driven Insights</h4>
                  <p className="text-gray-400">Harness your data to uncover actionable insights and drive decision-making.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="text-secondary-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Security & Compliance</h4>
                  <p className="text-gray-400">Protect your business with advanced security measures and ensure regulatory compliance.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Code className="text-secondary-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Custom Development</h4>
                  <p className="text-gray-400">Tailored software solutions designed specifically for your business needs.</p>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="btn btn-secondary px-6 py-3 inline-flex">
              Get a Technology Assessment
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="glass-card p-8 relative">
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary-500/10 rounded-full"></div>
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-secondary-500/10 rounded-full"></div>
              </div>
              
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-4">Technology Success Story</h3>
                
                <blockquote className="border-l-4 border-secondary-500 pl-4 mb-6">
                  <p className="italic text-gray-300">
                    "We didn't just build SmartLinks to track clicks - we built it to track connections. Watching it turn cold outreach into warm conversations, and data into action, reminded us that the smallest links can drive the biggest change."
                  </p>
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="/Employees/Himamshu Pandey CEO.png" 
                      alt="Himanshu Pandey" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Himanshu Pandey</p>
                    <p className="text-sm text-gray-400">Founder & CEO, SmartBrew Solutions</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-dark-700">
                  <h4 className="font-semibold mb-2">Results Achieved:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-secondary-500">85%</p>
                      <p className="text-sm text-gray-400">Response Rate</p>
                    </div>
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-secondary-500">3.5x</p>
                      <p className="text-sm text-gray-400">Engagement Growth</p>
                    </div>
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-secondary-500">92%</p>
                      <p className="text-sm text-gray-400">Connection Quality</p>
                    </div>
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-secondary-500">4.2x</p>
                      <p className="text-sm text-gray-400">ROI on Outreach</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechServicesCta;