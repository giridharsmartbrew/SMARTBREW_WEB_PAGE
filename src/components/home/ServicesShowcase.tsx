import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const ServicesShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  const services: Service[] = [
    {
      id: 1,
      title: 'Technology Solutions',
      description: 'Leverage cutting-edge technology to streamline operations, enhance productivity, and drive innovation across your organization.',
      image: '/OurCoreServices/Technology solutions.jpg',
      link: '/services#tech'
    },
    {
      id: 2,
      title: 'Sales Enablement',
      description: 'Empower your sales team with the tools, content, and information they need to sell more effectively in today\'s competitive landscape.',
      image: '/OurCoreServices/Sales Enablement.jpg',
      link: '/services#sales'
    },
    {
      id: 3,
      title: 'Digital Transformation',
      description: 'Transform your business model to thrive in the digital age with seamless integration of technology across all aspects of your operations.',
      image: '/OurCoreServices/Digital Transformation.jpg',
      link: '/services#digital'
    }
  ];

  return (
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Core Services
          </h2>
          <p className="text-lg text-gray-400">
            We provide comprehensive solutions to enhance both your technology infrastructure and sales capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              layoutId={`card-container-${service.id}`}
              className="glass-card overflow-hidden cursor-pointer h-96"
              onClick={() => setSelectedId(service.id)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-1/2 overflow-hidden">
                <motion.img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                  layoutId={`card-image-${service.id}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-6 h-1/2 flex flex-col justify-between">
                <motion.h3 
                  layoutId={`card-title-${service.id}`}
                  className="text-xl font-semibold mb-2"
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-400 text-sm line-clamp-3"
                >
                  {service.description}
                </motion.p>
                <motion.div>
                  <Link to={service.link} className="inline-flex items-center text-blue-500 text-sm">
                    Learn more <ArrowRight size={14} className="ml-1" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <AnimatePresence>
          {selectedId && (
            <motion.div 
              className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                layoutId={`card-container-${selectedId}`}
                className="bg-dark-800 rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl"
              >
                {services.find(service => service.id === selectedId) && (
                  <>
                    <div className="h-64 overflow-hidden">
                      <motion.img 
                        src={services.find(service => service.id === selectedId)?.image}
                        alt={services.find(service => service.id === selectedId)?.title}
                        className="w-full h-full object-cover"
                        layoutId={`card-image-${selectedId}`}
                      />
                    </div>
                    <div className="p-6">
                      <motion.h3 
                        layoutId={`card-title-${selectedId}`}
                        className="text-2xl font-semibold mb-3"
                      >
                        {services.find(service => service.id === selectedId)?.title}
                      </motion.h3>
                      <p className="text-gray-300 mb-4">
                        {services.find(service => service.id === selectedId)?.description}
                      </p>
                      <div className="flex justify-between">
                        <Link 
                          to={services.find(service => service.id === selectedId)?.link || ''}
                          className="btn btn-primary"
                          onClick={() => setSelectedId(null)}
                        >
                          Explore Service
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                        <button
                          onClick={() => setSelectedId(null)}
                          className="btn btn-outline"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesShowcase;