import React from 'react';
import { motion } from 'framer-motion';

const SalesSuccessStory: React.FC = () => {
  return (
    <div id="sales" className="glass-card p-8 relative h-full">
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
  );
};

export default SalesSuccessStory; 