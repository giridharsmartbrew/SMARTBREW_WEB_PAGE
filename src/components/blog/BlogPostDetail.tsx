import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: {
      name: string;
      avatar: string;
    };
    content?: string;
}

interface BlogPostDetailProps {
  post: BlogPost;
  onClose: () => void;
}

const BlogPostDetail = ({ post, onClose }: BlogPostDetailProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside of the modal content
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const formatContent = (content: string) => {
    // First, identify if it's a blog post that needs special handling based on title
    const isSalesBlog = post.title.includes("Succeed") || post.title.includes("Sales") || 
                         post.title.includes("Future Salesperson") || post.title.includes("Relationship Tech");
    
    const isTechBlog = post.title.includes("Machines Are Here") || 
                       post.title.includes("Technology") || 
                       post.title.includes("Tomorrow");
    
    const isNatureiumBlog = post.title.includes("NATUREIUM");
    
    return content.split('\n\n').map((paragraph, index) => {
      // Special handling for section titles - these should always be headings
      if (/^(A World of Unequal Odds|Enter: NATUREIM|A Transaction Worth Making|You \+ Me = Possibility|Should Technology Shape the World\?|But What Does This Mean for Power\?|What Must the Future Look Like\?|Final Thought|The Tug of War You're Playing|But Wait - What Is Sales\?|Gen Z, Here's the Truth|So… Do You Want to Succeed\?|The Myth We've Been Sold|Enter Relationship Tech|Why Gen Z Was Born for This|Tools Won't Sell for You|The Shift Is Here)$/.test(paragraph)) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-300 mb-6 mt-8">
            {paragraph}
          </h2>
        );
      }
      
      // Handle bullet points for "What makes NATUREIUM different?"
      if (paragraph.startsWith('What makes NATUREIUM different?')) {
        const [title, ...items] = paragraph.split('\n');
        return (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">{title}</h3>
            <ul className="list-none space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span className="text-gray-300 font-normal">{item.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Handle quotes in iChange blog
      if (paragraph.includes('"Turn on the screen') || 
          paragraph.includes('"The future in your pocket') || 
          paragraph.includes('"Bring back the Earth')) {
        return (
          <div key={index} className="my-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <p className="text-xl text-gray-200 italic font-normal leading-relaxed">
              {paragraph}
            </p>
          </div>
        );
      }

      // Handle data points in iChange blog
      if (paragraph.includes('550 bird trips') || paragraph.includes('300% increase')) {
        return (
          <div key={index} className="my-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <p className="text-emerald-400 font-mono font-normal">
              {paragraph}
            </p>
          </div>
        );
      }

      // Handle author bio
      if (paragraph.startsWith('x.com/hidigit')) {
        return (
          <div key={index} className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 italic font-normal">
              {paragraph}
            </p>
          </div>
        );
      }

      // Handle AI blog specific sections
      if (paragraph.startsWith('The Practical Optimist') ||
          paragraph.startsWith('The Underserved & Disconnected') ||
          paragraph.startsWith('The Cautious Parent') ||
          paragraph.startsWith('The Working-Class Professional') ||
          paragraph.startsWith('The Hopeful Believer') ||
          paragraph.startsWith('The Visionary Believer')) {
        const [title, quote, ...content] = paragraph.split('\n');
        return (
          <div key={index} className="my-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">{title}</h3>
            <p className="text-lg text-blue-400 mb-4 italic font-normal">"{quote}"</p>
            {content.map((line, i) => (
              <p key={i} className="text-gray-300 font-normal mb-2">{line}</p>
            ))}
          </div>
        );
      }

      // Handle AI blog future requirements
      if (paragraph.startsWith('Regenerative, not extractive') ||
          paragraph.startsWith('Inclusive by default') ||
          paragraph.startsWith('Transparent and accountable') ||
          paragraph.startsWith('Built for collaboration') ||
          paragraph.startsWith('Driven by values')) {
        const [title, ...content] = paragraph.split('\n');
        return (
          <div key={index} className="my-6">
            <h3 className="text-xl font-semibold text-emerald-400 mb-3">{title}</h3>
            {content.map((line, i) => (
              <p key={i} className="text-gray-300 font-normal mb-2">{line}</p>
            ))}
          </div>
        );
      }

      // Specific handling for bullet points sections in sales blogs
      if ((paragraph.includes("Pitch without pressure") && 
           paragraph.includes("Connect without pretending")) ||
          (paragraph.includes("Scale empathy") ||
           paragraph.includes("Personalize intention") ||
           paragraph.includes("Turn outreach into relationship-building") ||
           paragraph.includes("And replace hustle with flow"))) {
        const items = paragraph.split('\n');
        return (
          <div key={index} className="my-6">
            <ul className="list-none space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className={`${items[0].includes("Scale") ? "text-purple-400" : "text-blue-400"} mr-2`}>•</span>
                  <span className="text-gray-300 font-normal">{item.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Handle relationship tech features
      if (paragraph.includes('Tech that helps you build better relationships') ||
          paragraph.includes('Tech that reminds you who\'s worth following up with') ||
          paragraph.includes('Tech that knows when someone\'s curious') ||
          paragraph.includes('Tech that whispers') ||
          paragraph.includes('Tech that doesn\'t automate you out of the equation')) {
        const items = paragraph.split('\n');
        return (
          <div key={index} className="my-6">
            <ul className="list-none space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-gray-300 font-normal">{item.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      // Handle final statements in sales blogs
      if (paragraph.includes("Your ideas are worth hearing") || 
          paragraph.includes("Your future is worth pitching")) {
        const items = paragraph.split('\n');
        return (
          <div key={index} className="my-8">
            <ul className="list-none space-y-4">
              {items.map((item, i) => (
                <li key={i} className="text-xl text-gray-300 font-medium">
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Default for all other paragraphs: normal font weight
      return (
        <p key={index} className="mb-6 text-gray-300 font-normal leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
        onClick={onClose}
    >
        <div className="min-h-screen px-4 py-12" onClick={(e) => e.stopPropagation()}>
          <div 
            ref={modalRef} 
            className="max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden border border-gray-700"
          >
        {/* Header */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 text-gray-300 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
        </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400">
                {post.category}
              </span>
              <div className="flex items-center text-sm text-gray-400">
                <Calendar size={16} className="mr-1" />
                {post.date}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock size={16} className="mr-1" />
                {post.readTime}
              </div>
            </div>

              <h1 className="text-3xl font-bold text-gray-300 mb-6">
              {post.title}
            </h1>

              <div className="flex items-center mb-8">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-300 font-medium">{post.author.name}</p>
                <p className="text-gray-400 text-sm">Author</p>
              </div>
            </div>

              <div className="prose prose-invert prose-p:font-normal prose-headings:font-bold max-w-none">
                {post.content && formatContent(post.content)}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-300">Share this article</h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-400 hover:text-white transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                      </svg>
                  </button>
                    <button 
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-700 hover:text-white transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                  </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        // You could add a toast notification here
                        alert('Link copied to clipboard!');
                      }}
                      className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                      aria-label="Copy link"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </motion.div>
    </AnimatePresence>
  );
};

export default BlogPostDetail; 