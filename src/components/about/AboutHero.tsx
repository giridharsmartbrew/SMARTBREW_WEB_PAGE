import React from 'react';
import { motion } from 'framer-motion';

const AboutHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 bg-dark-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#0066cc"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-gradient">SMARTBREW</span>
          </motion.h1>

          <motion.div
            className="glass-card p-8 md:p-10 text-lg text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 text-justify">
              <p>
              Founded in 2022, SmartBrew Solutions is a pioneering performance-tech company that blends human insight, digital systems, and AI-powered tools to revolutionise how sales and fundraising outcomes are achieved. We empower businesses, nonprofits, and young professionals to unlock growth through smart, scalable, and purpose-driven solutions.
              </p>

              <p>
              Our mission is to empower sales teams and impact organisations with intelligent tech and performance systems that ensure consistency, data integrity, and measurable results.
              </p>

              <p>
              With a team of strategists, engineers, sales mentors, marketers, designers, and digital innovators, we're helping leading organisations grow, businesses improve sales, and hundreds of young professionals kickstart high-impact careers in sales.
              </p>

              <p>
              Whether you're a fast-growing startup, an established business, a purpose-led NGO, or an energetic individual looking to build a future-ready career - SmartBrew is your growth partner.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;