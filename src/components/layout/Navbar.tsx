import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronDown, LogIn, LogOut, User, UserPlus, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  isScrolled: boolean;
}

// Admin emails list to check if user should see admin panel option
const ADMIN_EMAILS = ['himanshu@smartbrew.in', 'giridhar.chennuru@smartbrew.in', 'hr@smartbrew.in'];

// Define dropdown items for each page
const pageDropdowns = {
  about: [
    { name: 'Company Story', href: '/about#hero' },
    { name: 'Our Values', href: '/about#values' },
    { name: 'Timeline', href: '/about#timeline' },
    { name: 'Team', href: '/about#team' }
  ],
  services: [
    { name: 'Professional Services', href: '/services#services' },
    { name: 'Success Stories', href: '/services#success-stories' },
    { name: 'Our Process', href: '/services#process' }
  ],
  blog: [
    { name: ' Our Blogs', href: '/blog#latest' },
    { name: 'Technology', href: '/blog#tech' },
    { name: 'Business', href: '/blog#business' }
  ],
  careers: [
    { name: 'Open Positions', href: '/careers#jobs' },
    { name: 'Company Culture', href: '/careers#culture' }
  ],
  contact: [
    { name: 'Contact Form', href: '/contact#form' },
    { name: 'Office Location', href: '/contact#map' },
    { name: 'FAQ', href: '/contact#faq' }
  ]
};

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Check if current user is an admin
  const isAdmin = user && user.email ? ADMIN_EMAILS.includes(user.email) : false;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Handle dropdown link clicks with smooth scrolling
  const handleDropdownClick = (href: string) => {
    setActiveDropdown(null);
    const [path, anchor] = href.split('#');
    
    if (anchor) {
      // If we're already on the page, just scroll to the element
      if (window.location.pathname === path) {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to the page first, then scroll after a short delay
        navigate(path);
        setTimeout(() => {
          const element = document.getElementById(anchor);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800' : 'bg-gray-900/90'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center"
            onClick={handleLinkClick}
          >
            <img 
              src="/SmartBrew Neon Logo - Shaded.png" 
              alt="SMARTBREW Logo" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain" 
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-400' : 'text-gray-300'
                }`
              }
            >
              Home
            </NavLink>
            
            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `text-sm font-medium hover:text-blue-400 transition-colors flex items-center ${
                    isActive ? 'text-blue-400' : 'text-gray-300'
                  }`
                }
              >
                About
                <ChevronDown className="ml-1 h-3 w-3" />
              </NavLink>
              
              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                  >
                    {pageDropdowns.about.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleDropdownClick(item.href)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink 
                to="/services" 
                className={({ isActive }) => 
                  `text-sm font-medium hover:text-blue-400 transition-colors flex items-center ${
                    isActive ? 'text-blue-400' : 'text-gray-300'
                  }`
                }
              >
                Services
                <ChevronDown className="ml-1 h-3 w-3" />
              </NavLink>
              
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                  >
                    {pageDropdowns.services.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleDropdownClick(item.href)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Blog Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('blog')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink 
                to="/blog" 
                className={({ isActive }) => 
                  `text-sm font-medium hover:text-blue-400 transition-colors flex items-center ${
                    isActive ? 'text-blue-400' : 'text-gray-300'
                  }`
                }
              >
                Blog
                <ChevronDown className="ml-1 h-3 w-3" />
              </NavLink>
              
              <AnimatePresence>
                {activeDropdown === 'blog' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                  >
                    {pageDropdowns.blog.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleDropdownClick(item.href)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Careers Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('careers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink 
                to="/careers" 
                className={({ isActive }) => 
                  `text-sm font-medium hover:text-blue-400 transition-colors flex items-center ${
                    isActive ? 'text-blue-400' : 'text-gray-300'
                  }`
                }
              >
                Careers
                <ChevronDown className="ml-1 h-3 w-3" />
              </NavLink>
              
              <AnimatePresence>
                {activeDropdown === 'careers' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                  >
                    {pageDropdowns.careers.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleDropdownClick(item.href)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Contact Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('contact')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `text-sm font-medium hover:text-blue-400 transition-colors flex items-center ${
                    isActive ? 'text-blue-400' : 'text-gray-300'
                  }`
                }
              >
                Contact
                <ChevronDown className="ml-1 h-3 w-3" />
              </NavLink>
              
              <AnimatePresence>
                {activeDropdown === 'contact' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                  >
                    {pageDropdowns.contact.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleDropdownClick(item.href)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="md:hidden flex items-center justify-end ml-auto">
            <button
              className="p-2 rounded-md text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-300">
                  <span className="flex items-center">
                    <User size={16} className="mr-1 text-blue-400" />
                    {user.email?.split('@')[0]}
                  </span>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Admin Panel
                    <Shield size={16} className="ml-1" />
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-gray-500 text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign Out
                  <LogOut size={16} className="ml-1" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
            <Link
                  to="/signin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                  Sign In
                  <LogIn size={16} className="ml-1" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 border border-gray-500 text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign Up
                  <UserPlus size={16} className="ml-1" />
            </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-14 sm:top-16 inset-x-0 bg-gray-900/98 backdrop-blur-lg border-b border-gray-800 max-h-screen overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-3 sm:px-4 py-4 flex flex-col space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `p-3 rounded-lg ${
                    isActive ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`
                }
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `p-3 rounded-lg ${
                    isActive ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`
                }
                onClick={handleLinkClick}
              >
                About
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `p-3 rounded-lg ${
                    isActive ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`
                }
                onClick={handleLinkClick}
              >
                Services
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `p-3 rounded-lg ${
                    isActive ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`
                }
                onClick={handleLinkClick}
              >
                Blog
              </NavLink>
              <NavLink
                to="/careers"
                className={({ isActive }) =>
                  `p-3 rounded-lg ${
                    isActive ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`
                }
                onClick={handleLinkClick}
              >
                Careers
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `p-3 rounded-lg ${
                    isActive ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`
                }
                onClick={handleLinkClick}
              >
                Contact
              </NavLink>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full mt-4"
                      onClick={handleLinkClick}
                    >
                      Admin Panel
                      <Shield size={16} className="ml-1" />
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-500 text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full mt-4"
                  >
                    Sign Out
                    <LogOut size={16} className="ml-1" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-4">
                  <Link
                    to="/signin"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
                    onClick={handleLinkClick}
                  >
                    Sign In
                    <LogIn size={16} className="ml-1" />
                  </Link>
              <Link
                    to="/signup"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-500 text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full"
                onClick={handleLinkClick}
              >
                    Sign Up
                    <UserPlus size={16} className="ml-1" />
              </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;