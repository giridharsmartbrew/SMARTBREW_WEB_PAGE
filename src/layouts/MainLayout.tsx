import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/animations/PageTransition';
import ScrollToTop from '../components/utils/ScrollToTop';
import FloatingContact from '../components/ui/FloatingContact';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar isScrolled={isScrolled} />
      
      <main className="flex-grow relative">
        <PageTransition location={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      
      <FloatingContact />
      <Footer />
    </div>
  );
};

export default MainLayout;