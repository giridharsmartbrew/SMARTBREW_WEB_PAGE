import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BarChart2, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const SalesServicesCta: React.FC = () => {
  return (
    <section id="sales" className="py-20 bg-gradient-to-br from-dark-900 to-accent-900/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L100,0 L100,100 L0,100 Z"
            fill="none"
            stroke="url(#sales-gradient)"
            vectorEffect="non-scaling-stroke"
            strokeWidth="0.5"
          ></path>
          <defs>
            <linearGradient id="sales-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eb2f96" />
              <stop offset="100%" stopColor="#1890ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sales Enablement That <span className="text-gradient">Drives Revenue</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-6">
              Our sales enablement solutions equip your team with the tools, content, and insights they need to sell more effectively and close deals faster.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <Users className="text-accent-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Sales Team Optimization</h4>
                  <p className="text-gray-400">Enhance productivity and performance of your sales professionals.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <BarChart2 className="text-accent-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Sales Analytics & Forecasting</h4>
                  <p className="text-gray-400">Data-driven insights to predict trends and optimize your sales strategy.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Zap className="text-accent-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Process Automation</h4>
                  <p className="text-gray-400">Streamline repetitive tasks to let your team focus on building relationships.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Target className="text-accent-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Lead Generation & Nurturing</h4>
                  <p className="text-gray-400">Identify and cultivate high-quality prospects through the sales funnel.</p>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="btn btn-primary px-6 py-3 inline-flex">
              Get a Sales Assessment
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
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent-500/10 rounded-full"></div>
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary-500/10 rounded-full"></div>
              </div>
              
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-4">Sales Success Story</h3>
                
                <blockquote className="border-l-4 border-accent-500 pl-4 mb-6">
                  <p className="italic text-gray-300">
                    "What changed everything for me wasn't just better tools - it was SmartBrew's insight-driven products. People now come in curious, connected, and already see the value. Reaching out feels less like selling, and more like joining a conversation people are happy to have."
                  </p>
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="/SmartBrew Neon logo.png" 
                      alt="Sales Executive" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Sales Executive</p>
                    <p className="text-sm text-gray-400">SmartBrew Solutions</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-dark-700">
                  <h4 className="font-semibold mb-2">Results Achieved:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-accent-500">78%</p>
                      <p className="text-sm text-gray-400">Higher Engagement</p>
                    </div>
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-accent-500">2.8x</p>
                      <p className="text-sm text-gray-400">Conversation Quality</p>
                    </div>
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-accent-500">45%</p>
                      <p className="text-sm text-gray-400">Faster Response</p>
                    </div>
                    <div className="bg-dark-800 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-accent-500">3.2x</p>
                      <p className="text-sm text-gray-400">ROI on Insights</p>
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

export default SalesServicesCta;