import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Car, Train } from 'lucide-react';

const ContactMap: React.FC = () => {
  return (
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Visit Our Office
          </h2>
          <p className="text-gray-400">
            SmartBrew Solutions is located in Mega Mall Gurgaon, a prime location in the heart of Gurugram
          </p>
        </div>
        
        <motion.div
          className="glass-card p-4 h-96"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <iframe 
            title="SmartBrew Office Location"
            className="w-full h-full rounded-lg"
            frameBorder="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.0922!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sMega%20Mall%2C%20Golf%20Course%20Rd%2C%20Sector%2028%2C%20DLF%20Phase%201%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1647881234567!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div 
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-gray-400">
              SmartBrew Solutions, Mega Mall Gurgaon (3rd floor), Golf Course Rd, Sector 28, DLF Phase 1, Gurugram, Haryana 122022
            </p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <Car className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Parking</h3>
            <p className="text-gray-400">
              Mega Mall offers ample parking space. Visitors can use the mall's parking facility.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <Train className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Public Transit</h3>
            <p className="text-gray-400">
              Easily accessible via Delhi Metro and local bus services. Auto-rickshaws and cabs available nearby.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;