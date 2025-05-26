import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "TechSales transformed our sales process with their innovative solutions. Our team's productivity increased by 35% within just two months.",
    author: "Sarah Johnson",
    position: "Sales Director",
    company: "GlobalTech Inc.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    content: "The data analytics platform provided by TechSales gave us unprecedented insights into customer behavior, allowing us to optimize our approach and increase conversions.",
    author: "Michael Chen",
    position: "CEO",
    company: "Innovate Solutions",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    content: "Their cloud migration services were seamless and efficient. We experienced zero downtime and our team adapted quickly to the new system.",
    author: "Emily Rodriguez",
    position: "CTO",
    company: "FutureTech",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const TestimonialSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const next = () => {
    setDirection(1);
    setCurrent((current + 1) % testimonials.length);
  };
  
  const prev = () => {
    setDirection(-1);
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto rotate testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      next();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [current]);
  
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 100 : -100,
        opacity: 0
      };
    }
  };

  return (
    <section className="py-20 bg-dark-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-400">
              Trusted by innovative companies worldwide
            </p>
          </div>
          
          <div className="relative">
            <Quote className="absolute text-primary-500/20 w-20 h-20 -top-10 -left-10 rotate-180" />
            
            <div className="glass-card p-8 relative">
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="w-full md:w-1/3">
                    <div className="aspect-square rounded-full overflow-hidden border-4 border-primary-500/20 shadow-xl mx-auto md:mx-0 w-40 h-40">
                      <img 
                        src={testimonials[current].image} 
                        alt={testimonials[current].author}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <p className="text-lg mb-6 italic text-gray-300">
                      "{testimonials[current].content}"
                    </p>
                    <div>
                      <p className="text-lg font-semibold">{testimonials[current].author}</p>
                      <p className="text-primary-500">{testimonials[current].position}</p>
                      <p className="text-sm text-gray-400">{testimonials[current].company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center md:justify-end space-x-2 mt-8">
                <button 
                  onClick={prev}
                  className="p-2 rounded-full bg-dark-800 hover:bg-primary-500 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={next}
                  className="p-2 rounded-full bg-dark-800 hover:bg-primary-500 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="flex justify-center space-x-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1);
                      setCurrent(index);
                    }}
                    className={`w-2 h-2 rounded-full ${
                      index === current ? 'bg-primary-500' : 'bg-dark-700'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;