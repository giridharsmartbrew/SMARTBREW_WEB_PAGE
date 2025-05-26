import React from 'react';
import { motion } from 'framer-motion';

const TechSuccessStory: React.FC = () => {
  return (
    <div id="tech" className="glass-card p-8 relative h-full">
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
  );
};

export default TechSuccessStory; 