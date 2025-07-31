import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedText from '../animations/AnimatedText';
import NetworkScene from '../3d/NetworkScene';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollY = window.scrollY;
      const section = sectionRef.current;
      
      // Move elements based on scroll position for parallax effect
      const overlay = section.querySelector('.overlay') as HTMLElement;
      const content = section.querySelector('.content') as HTMLElement;
      
      if (overlay && content) {
        overlay.style.transform = `translateY(${scrollY * 0.1}px)`;
        content.style.transform = `translateY(${scrollY * 0.05}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] md:min-h-screen flex items-center mb-16 md:mb-0">
      {/* 3D Network Background */}
      <div className="absolute inset-0 z-0">
        <NetworkScene />
      </div>
      
      {/* Gradient Overlay */}
      <div className="overlay absolute inset-0 z-10 bg-gradient-to-b from-dark-950/80 via-dark-950/60 to-dark-950"></div>
      
      {/* Hero Content */}
      <div className="content container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-24 md:pt-28">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedText text="Transforming Technology," className="block mb-2" />
            <AnimatedText 
              text="Empowering Sales" 
              className="text-gradient block" 
              delay={0.4}
            />
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            We help businesses leverage cutting-edge technology to optimize sales processes, 
            enhance customer experiences, and drive sustainable growth.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link to="/services" className="btn btn-secondary px-6 py-3">
              Explore Solutions
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link to="/contact" className="btn btn-outline px-6 py-3">
              Contact Us
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="glass-card p-4 sm:p-6">
              <p className="text-2xl sm:text-3xl font-bold text-secondary-500">98%</p>
              <p className="text-xs sm:text-sm text-gray-400">Client Satisfaction</p>
            </div>
            <div className="glass-card p-4 sm:p-6">
              <p className="text-2xl sm:text-3xl font-bold text-secondary-500">250+</p>
              <p className="text-xs sm:text-sm text-gray-400">Projects Completed</p>
            </div>
            <div className="glass-card p-4 sm:p-6 col-span-2 sm:col-span-1">
              <p className="text-2xl sm:text-3xl font-bold text-secondary-500">35%</p>
              <p className="text-xs sm:text-sm text-gray-400">Average ROI Increase</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"
              animate={{ 
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;