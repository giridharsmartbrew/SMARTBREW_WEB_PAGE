import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeatureSection from '../components/home/FeatureSection';
import ServicesShowcase from '../components/home/ServicesShowcase';
// import TestimonialSlider from '../components/home/TestimonialSlider';
import CtaSection from '../components/home/CtaSection';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SmartBrew Solutions",
    "alternateName": "SmartBrew",
    "description": "Leading provider of sales technology and business automation solutions. Transform your sales process with AI-powered platforms and expert consulting.",
    "url": "https://smartbrew.in",
    "logo": "https://smartbrew.in/SmartBrew Neon logo-01.png",
    "foundingDate": "2023",
    "founder": {
      "@type": "Person",
      "name": "Himanshu Pandey",
      "jobTitle": "CEO & Founder"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "email": "info@smartbrew.in",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "sameAs": [
      "https://linkedin.com/company/smartbrew-solutions",
      "https://twitter.com/smartbrew_in"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SmartBrew Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sales Technology Solutions",
            "description": "Advanced CRM and sales automation platforms"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Automation",
            "description": "End-to-end business process automation solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing Solutions",
            "description": "AI-powered marketing automation and lead generation"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO 
        title="SmartBrew Solutions - Transform Your Sales with AI-Powered Technology"
        description="Leading provider of sales technology and business automation solutions. Boost your sales performance with our AI-powered CRM, marketing automation, and expert consulting services."
        keywords="sales technology, business automation, AI-powered CRM, marketing automation, lead generation, sales consulting, digital transformation, SmartBrew Solutions"
        url="https://smartbrew.in"
        type="website"
        schema={homeSchema}
      />
      <div>
        <HeroSection />
        <FeatureSection />
        <ServicesShowcase />
        {/* <TestimonialSlider /> */}
        <CtaSection />
      </div>
    </>
  );
};

export default HomePage;