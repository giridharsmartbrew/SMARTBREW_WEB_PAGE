import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLeft: boolean;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, isLeft, index }) => {
  // Split the title into category and product name
  const [category, productName] = title.split('|').map(part => part.trim());

  return (
    <motion.div 
      className={`relative flex items-center ${isLeft ? 'flex-row-reverse' : ''} mb-8`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`w-full md:w-1/2 px-4 md:px-8 ${isLeft ? 'text-right' : 'text-left'}`}>
        <div className="glass-card p-6">
          <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-2">
            {year}
          </span>
          <h3 className="text-xl font-semibold mb-2">
            <span className="text-gray-400">{category}</span>
            <span className="mx-2 text-gray-500">|</span>
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent font-bold">
              {productName}
            </span>
          </h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      
      <div className="absolute z-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div className="h-full w-1 bg-secondary-500/30 absolute"></div>
        <div className="w-4 h-4 rounded-full bg-secondary-500 border-4 border-dark-900"></div>
      </div>
      
      <div className="w-full md:w-1/2"></div>
    </motion.div>
  );
};

const CompanyTimeline: React.FC = () => {
  const timelineData = [
    {
      year: "2022",
      title: "The Beginning | Born to Perform",
      description: "SmartBrew was founded with one bold vision, transforming purpose into performance using tech, talent, and insight, in line with our core belief that performance pays."
    },
    {
      year: "2022",
      title: "First Innovation | Smart Links",
      description: "Our first product, SmartLinks, was born from real-world field insights - a lightweight tool to track outreach, pitch effectiveness, and engagement in real time, delivering a 4x boost in conversions."
    },
    {
      year: "2023",
      title: "Intelligence Breakthrough | Smart Signals",
      description: "Launched SmartSignals to cut through the noise - an intelligent engine that identifies high-intent prospects by analyzing real-time responses to outreach stimuli, turning cold data into a warm, inbound funnel."
    },
    {
      year: "2024",
      title: "Sales Revolution | Beacon CRM",
      description: "We launched Smart CRM, a next-gen sales system with dynamic funnels, smart outcome tagging, and real-time pitch logging - giving frontline teams the visibility, speed, and focus they need to achieve their goals."
    },
    {
      year: "2025",
      title: "Future of Sales | Pitch Lab",
      description: "Created a revolutionary training platform that redefines sales education, focusing on authentic connections and real-world influence."
    },
    {
      year: "Today",
      title: "Next Chapter | Brewing Bigger",
      description: "Pioneering the future with smart solutions that anticipate needs and unlock new possibilities in performance technology."
    }
  ];

  return (
    <section className="py-20 bg-dark-950 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-gray-400">
            From vision to reality - the evolution of SMARTBREW
          </p>
        </div>
        
        <div className="relative">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              year={item.year}
              title={item.title}
              description={item.description}
              isLeft={index % 2 === 1}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;