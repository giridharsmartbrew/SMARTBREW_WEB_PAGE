import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  Lightbulb,
  PieChart,
  Users,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Value: React.FC<ValueProps> = ({ icon, title, description, delay }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="text-blue-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const CompanyValues: React.FC = () => {
  const values = [
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation",
      description: "We relentlessly pursue creative solutions that challenge the status quo and deliver breakthrough results."
    },
    {
      icon: <PieChart size={32} />,
      title: "Data-Driven",
      description: "We base decisions on robust data and analytics, ensuring measurable outcomes for our clients."
    },
    {
      icon: <Users size={32} />,
      title: "Client-Centric",
      description: "We place our clients at the heart of everything we do, focusing on long-term partnerships."
    },
    {
      icon: <Shield size={32} />,
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our interactions and business practices."
    },
    {
      icon: <Zap size={32} />,
      title: "Agility",
      description: "We adapt quickly to changing market dynamics and evolving client needs."
    },
    {
      icon: <Globe size={32} />,
      title: "Impact",
      description: "We measure our success by the tangible impact we create for our clients' businesses."
    }
  ];

  return (
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-400">
            The principles that guide our decisions and shape our company culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Value
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;