import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  categories: string[];
  techStack: string[];
}

const ProductGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const products: Product[] = [
    {
      id: 1,
      name: "SmartBrew AI Suite",
      description: "Enterprise-grade AI platform combining machine learning, natural language processing, and predictive analytics for intelligent business automation.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=800&q=80",
      categories: ["ai", "technology", "analytics"],
      techStack: ["TensorFlow", "Python", "AWS", "React"]
    },
    {
      id: 2,
      name: "SalesForce Pro",
      description: "Comprehensive sales enablement platform with AI-powered lead scoring, automated workflows, and real-time analytics for enhanced sales performance.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&w=800&q=80",
      categories: ["sales", "ai", "analytics"],
      techStack: ["Node.js", "MongoDB", "React", "Docker"]
    },
    {
      id: 3,
      name: "CloudMatrix Enterprise",
      description: "Advanced cloud infrastructure solution with integrated security, scalability, and AI-powered resource optimization for modern enterprises.",
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=800&q=80",
      categories: ["cloud", "security", "technology"],
      techStack: ["Kubernetes", "AWS", "Terraform", "Python"]
    },
    {
      id: 4,
      name: "DataInsights Hub",
      description: "Powerful data analytics platform with real-time visualization, predictive modeling, and automated reporting capabilities.",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&w=800&q=80",
      categories: ["analytics", "technology", "ai"],
      techStack: ["Python", "Apache Spark", "React", "PostgreSQL"]
    },
    {
      id: 5,
      name: "SecureCloud Shield",
      description: "Next-generation cloud security solution with AI-powered threat detection, automated compliance, and real-time monitoring.",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&w=800&q=80",
      categories: ["security", "cloud", "ai"],
      techStack: ["AWS", "Python", "React", "Docker"]
    },
    {
      id: 6,
      name: "SalesEngage Pro",
      description: "Intelligent sales engagement platform with automated workflows, performance tracking, and AI-driven insights for sales optimization.",
      image: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&w=800&q=80",
      categories: ["sales", "technology", "analytics"],
      techStack: ["Node.js", "MongoDB", "React", "Docker"]
    }
  ];
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.categories.includes(activeCategory));
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'sales', name: 'Sales Solutions' },
    { id: 'technology', name: 'Technology' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'cloud', name: 'Cloud Services' },
    { id: 'security', name: 'Security' },
    { id: 'ai', name: 'AI & ML' }
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
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="glass-card overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((category) => (
                    <span 
                      key={category} 
                      className="px-2 py-1 bg-dark-800 rounded-full text-xs text-gray-400"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-primary-500/10 rounded-full text-xs text-primary-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link to={`/products/${product.id}`} className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors">
                  Learn more <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-400">Try selecting a different category or refining your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;