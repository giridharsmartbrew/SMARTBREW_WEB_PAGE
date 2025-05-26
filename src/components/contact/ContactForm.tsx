import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ContactForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    interest: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!user) {
      setErrorMessage('Please sign in to submit the form');
      // Store form data in session storage
      sessionStorage.setItem('contactFormData', JSON.stringify(formState));
      // Redirect to sign in page
      navigate('/signin?redirect=contact');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Save contact form data to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formState.name,
            email: formState.email,
            phone: formState.phone || null,
            company: formState.company || null,
            message: formState.message,
            interest: formState.interest,
            created_at: new Date().toISOString(),
            
          }
        ]);
        
      if (error) {
        throw new Error(`Submission failed: ${error.message}`);
      }

      console.log('Contact form submitted successfully');
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          interest: 'general'
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setIsSubmitting(false);
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  // Load saved form data if returning from authentication
  React.useEffect(() => {
    if (user) {
      const savedData = sessionStorage.getItem('contactFormData');
      if (savedData) {
        setFormState(JSON.parse(savedData));
        sessionStorage.removeItem('contactFormData');
      }
    }
  }, [user]);

  return (
    <motion.div
      className="glass-card p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
      
      {isSubmitted ? (
        <motion.div 
          className="bg-success-900/20 border border-success-700 rounded-lg p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-success-500 rounded-full mb-4">
            <Check size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
          <p className="text-gray-300">
            Thank you for contacting us. We'll get back to you as soon as possible.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          {!user && (
            <motion.div 
              className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6 flex items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LogIn size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-300 mb-2">You need to be signed in to submit this form.</p>
                <Link 
                  to="/signin?redirect=contact" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                >
                  Sign In <LogIn size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          )}
          
          {errorMessage && (
            <motion.div 
              className="bg-error-900/20 border border-error-700 rounded-lg p-4 mb-6 flex items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={20} className="text-error-500 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-sm text-error-300">{errorMessage}</span>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address <span className="text-error-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formState.company}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-1">
              What are you interested in? <span className="text-error-500">*</span>
            </label>
            <select
              id="interest"
              name="interest"
              value={formState.interest}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="general">General Inquiry</option>
              <option value="tech">Technology Solutions</option>
              <option value="sales">Sales Enablement</option>
              <option value="consulting">Consulting Services</option>
              <option value="partnership">Partnership Opportunities</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Your Message <span className="text-error-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !user}
            className={`btn btn-secondary w-full justify-center ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                {user ? 'Send Message' : 'Sign in to Submit'}
                <Send size={16} className="ml-2" />
              </span>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default ContactForm;