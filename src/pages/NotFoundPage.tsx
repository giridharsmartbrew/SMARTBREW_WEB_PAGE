import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-9xl font-bold text-gray-800 mb-4 text-primary-500"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          404
        </motion.h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <HomeIcon size={18} className="mr-2" />
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;