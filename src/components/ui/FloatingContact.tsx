import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  
  // Don't show on home page
  if (location.pathname === '/') {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all fields');
      }

      // Submit to Supabase
      const { error: supabaseError } = await supabase
        .from('quickchat')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim()
          }
        ]);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Success - show reply interface
      setIsSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset states when closing
    setTimeout(() => {
      setIsSubmitted(false);
      setError(null);
      setFormData({ name: '', email: '', message: '' });
    }, 300);
  };

  const handleNewMessage = () => {
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="p-4 border-b border-dark-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {isSubmitted ? 'Message Sent!' : 'Quick Contact'}
                </h3>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                      rows={3}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                      disabled={isSubmitting}
                      required
                    ></textarea>
                  </div>
                  
                  {error && (
                    <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-2">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              ) : (
                // Reply Interface
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle size={48} className="text-green-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-green-400">Thank you for your message!</h4>
                    <p className="text-gray-300 text-sm">
                      We've received your message and will get back to you soon.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleNewMessage}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Send Another
                    </button>
                    <button
                      onClick={handleClose}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MessageSquare size={24} className="text-white" />
      </motion.button>
    </>
  );
};

export default FloatingContact;