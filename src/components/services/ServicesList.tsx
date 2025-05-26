import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  LineChart, 
  Database, 
  Cloud, 
  Shield, 
  Users, 
  PieChart, 
  Laptop,
  DollarSign
} from 'lucide-react';

// Service types
type FilterType = 'all' | 'tech' | 'sales';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: 'tech' | 'sales';
}

const ServicesList: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  
  const services: Service[] = [
    // Tech Solutions
    {
      id: 1,
      icon: <Code size={32} />,
      title: "Custom Software Development",
      description: "Tailored software solutions designed to address your specific business challenges and opportunities.",
      category: 'tech'
    },
    {
      id: 2,
      icon: <LineChart size={32} />,
      title: "AI & Machine Learning",
      description: "Advanced analytics and automation powered by the latest developments in artificial intelligence.",
      category: 'tech'
    },
    {
      id: 3,
      icon: <Database size={32} />,
      title: "Data Management",
      description: "Comprehensive data storage, processing, and governance solutions to maximize the value of your information assets.",
      category: 'tech'
    },
    {
      id: 4,
      icon: <Cloud size={32} />,
      title: "Cloud Infrastructure",
      description: "Scalable, secure, and flexible cloud solutions tailored to your business needs and growth objectives.",
      category: 'tech'
    },
    {
      id: 5,
      icon: <Shield size={32} />,
      title: "Cybersecurity",
      description: "Robust security measures to protect your business from evolving digital threats and ensure compliance.",
      category: 'tech'
    },
    // Sales Solutions
    {
      id: 6,
      icon: <PieChart size={32} />,
      title: "Sales Analytics",
      description: "Data-driven insights to optimize your sales process, forecast accurately, and make informed decisions.",
      category: 'sales'
    },
    {
      id: 7,
      icon: <Users size={32} />,
      title: "CRM Implementation",
      description: "Strategic deployment of customer relationship management systems to enhance client interactions.",
      category: 'sales'
    },
    {
      id: 8,
      icon: <Laptop size={32} />,
      title: "Sales Automation",
      description: "Streamline repetitive tasks and focus your team's effort on high-value activities that drive revenue.",
      category: 'sales'
    },
    {
      id: 9,
      icon: <DollarSign size={32} />,
      title: "Fundraising",
      description: "Strategic fundraising solutions to help organizations secure funding and build sustainable revenue streams.",
      category: 'sales'
    }
  ];
  
  // Filter services based on selected filter
  const filteredServices = filter === 'all' 
    ? services 
    : services.filter(service => service.category === filter);
  
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

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return (
    <section className="py-20 bg-dark-900" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl text-gradient md:text-4xl font-bold mb-4">
            Smart Solutions. Real Results.
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Accelerate your growth journey with us
          </p>
          
          <div className="inline-flex p-1 bg-dark-800 rounded-lg">
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => handleFilterChange('all')}
              data-filter="all"
            >
              All
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                filter === 'tech' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => handleFilterChange('tech')}
              data-filter="tech"
            >
              Tech
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                filter === 'sales' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => handleFilterChange('sales')}
              data-filter="sales"
            >
              Sales
            </button>
          </div>
        </div>
        
        <motion.div 
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              className="glass-card p-6 h-full flex flex-col"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="text-blue-500 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{service.description}</p>
              <div className="pt-4 border-t border-dark-700 mt-auto">
                <span className="inline-block px-3 py-1 bg-dark-800 rounded-full text-xs font-medium text-blue-400">
                  {service.category === 'tech' ? 'Technology' : 'Sales'}
                </span>
                <span className="inline-block ml-2 px-3 py-1 bg-dark-800 rounded-full text-xs font-medium text-blue-400">
                  Service #{service.id}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesList;