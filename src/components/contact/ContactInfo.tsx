import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Clock, 
  Facebook, 
  X, 
  Instagram, 
  Linkedin
} from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <motion.div
      className="glass-card p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
      
      <div className="space-y-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <MapPin className="text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Address</h3>
            <p className="text-gray-400">SmartBrew Solutions,</p>
            <p className= "text-gray-400">Space Creattors Heights,Mega Mall Gurgaon (3rd floor),</p>
            <p className="text-gray-400">Golf Course Rd, Sector 28, DLF Phase 1</p>
            <p className="text-gray-400">Gurugram, Haryana 122022</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Mail className="text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Email Addresses</h3>
            {/* <p className="text-blue-400">General: enquiry@smartbrew.in</p> */}
            <p className="text-blue-400">Contact: contact@smartbrew.in</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Clock className="text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Business Hours</h3>
            <p className="text-gray-400">Monday-Saturday: 10:30 AM - 6:30 PM (IST)</p>
            <p className="text-gray-400">Sunday: Closed</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Connect With Us</h3>
        <div className="flex space-x-4">
          <a 
            href="https://www.facebook.com/profile.php?id=61576191339748" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a 
            href="https://x.com/smartbrewnow" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
            aria-label="X"
          >
            <X size={18} />
          </a>
          <a 
            href="https://instagram.com/smartbrewnow" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/company/smartbrewnow" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;