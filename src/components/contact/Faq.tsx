import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqItems: FaqItem[] = [
    {
      question: "What industries do you specialize in?",
      answer: "We work with various social organizations and high-growth businesses in the corporate, nonprofit, tech, and retail sectors. Our solutions are scaleable, no matter the model or mission."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Basic implementations can take between 2 - 4 weeks, while full-scale projects may take up to 3 - 6 months, based on the complexity and customisations required."
    },
    {
      question: "Do you provide training and support after implementation?",
      answer: "Absolutely. We offer hands-on training, tailored to different user roles - whether it’s your frontline team, managers, or tech leads. Our support doesn’t stop at go-live."
    },

    {
      question: "What makes your solutions different from competitors?",
      answer: "We build outcome-driven systems for real-world performance. Our edge? A team of engineers, strategists, designers, marketing and sales pros working together to deliver optimised solutions."
    },

    {
      question: "Can your solutions integrate with our existing systems?",
      answer: "Yes. Our products integrate seamlessly with most CRMs, ERPs, marketing tools, and custom applications. We’ll assess your current tech stack and craft a strategy that will keep your workflows intact - just faster, smarter, and more efficient."
    },
    {
      question: "What kind of ROI can we expect from your solutions?",
      answer: "ROI depends on your goals - but the gains are real. Our clients typically see:\n• 20–35% increase in conversion rates\n• 15–25% shorter sales cycles\n• 25–40% boost in efficiency and cost savings\nWe define success metrics upfront and track performance to ensure you're getting measurable, sustained impact - not just implementation."
    }
  ];
  
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-dark-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Find answers to common questions about our services and solutions
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((faq, index) => (
            <motion.div 
              key={index}
              className="mb-4 glass-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="ml-4">
                  {activeIndex === index ? (
                    <ChevronDown className="text-primary-500" />
                  ) : (
                    <ChevronRight className="text-gray-400" />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-xl mx-auto mt-12 text-center">
          <p className="text-gray-300 mb-6">
            Still have questions? Our team is ready to help.
          </p>
          <a href="mailto:contact@smartbrew.in" className="btn btn-primary">
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Faq;