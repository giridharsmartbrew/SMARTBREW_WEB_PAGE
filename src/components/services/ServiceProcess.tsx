import React from 'react';
import { motion } from 'framer-motion';

const ServiceProcess: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Analysis",
      description: "We begin by thoroughly understanding your business, challenges, and objectives through in-depth consultations and data analysis."
    },
    {
      number: "02",
      title: "Strategy Development",
      description: "Based on our findings, we create a comprehensive strategy tailored to your specific needs and aligned with your business goals."
    },
    {
      number: "03",
      title: "Implementation",
      description: "Our expert team executes the strategy with precision, integrating technology solutions and sales methodologies into your operations."
    },
    {
      number: "04",
      title: "Training & Support",
      description: "We provide comprehensive training to ensure your team can maximize the value of the implemented solutions."
    },
    {
      number: "05",
      title: "Monitoring & Optimization",
      description: "We continuously monitor performance and make data-driven adjustments to optimize results and ensure sustainable success."
    }
  ];

  return (
    <section className="py-20 bg-dark-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Service Process
          </h2>
          <p className="text-lg text-gray-400">
            A systematic approach to delivering exceptional results
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary-500/30 transform -translate-x-1/2 hidden md:block"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Process step number - visible on mobile only */}
              <div className="flex items-center justify-center mb-6 md:hidden">
                <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-500">{step.number}</span>
                </div>
              </div>
              
              <div className="w-full md:w-5/12 px-4">
                <div className={`glass-card p-6 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
              
              {/* Center dot */}
              <div className="hidden md:flex w-2/12 items-center justify-center relative">
                <div className="w-10 h-10 rounded-full bg-dark-950 border-4 border-primary-500 z-10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-500">{step.number}</span>
                </div>
                <div className="absolute w-24 h-0.5 bg-primary-500/30" style={{ 
                  left: index % 2 === 0 ? '50%' : 'auto', 
                  right: index % 2 === 1 ? '50%' : 'auto' 
                }}></div>
              </div>
              
              <div className="w-full md:w-5/12 px-4 hidden md:block">
                {/* Empty div for layout */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;