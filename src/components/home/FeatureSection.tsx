import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  Brain,
  LineChart, 
  Users, 
  Sparkles, 
  Cloud, 
  Globe 
} from 'lucide-react';

const FeatureSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: 'Intelligent Systems',
      description: 'Advanced systems that learn and adapt to optimize your business operations.'
    },
    {
      icon: <LineChart className="h-8 w-8 text-blue-500" />,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights that drive business growth.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Sales Enablement',
      description: 'Equip your sales team with the tools and real time information to sell effectively.'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
      title: 'AI Solutions',
      description: 'Leverage the power of artificial intelligence to automate processes and enhance decision-making.'
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-500" />,
      title: 'Cloud Services',
      description: 'Scalable, secure, and flexible cloud solutions tailored to your business needs.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: 'Global Reach',
      description: 'Expand your market presence with technology solutions that transcend geographical boundaries.'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12
      }
    }
  };

  return (
    <section className="py-20 bg-dark-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Innovative Solutions for Modern Businesses
          </h2>
          <p className="text-lg text-gray-400">
            We combine cutting-edge technology with sales expertise to help businesses thrive in the digital era.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 h-full"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;