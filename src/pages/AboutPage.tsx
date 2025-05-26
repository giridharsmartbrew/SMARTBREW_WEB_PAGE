import React from 'react';
import { motion } from 'framer-motion';
import AboutHero from '../components/about/AboutHero';
import TeamSection from '../components/about/TeamSection';
import CompanyTimeline from '../components/about/CompanyTimeline';
import CompanyValues from '../components/about/CompanyValues';
import SEO from '../components/SEO';

const AboutPage: React.FC = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About SmartBrew Solutions",
    "description": "Learn about SmartBrew Solutions - our mission, values, team, and journey in transforming sales technology and business automation.",
    "mainEntity": {
      "@type": "Organization",
      "name": "SmartBrew Solutions",
      "foundingDate": "2023",
      "founder": {
        "@type": "Person",
        "name": "Himanshu Pandey",
        "jobTitle": "CEO & Founder"
      },
      "url": "https://smartbrew.in",
      "logo": "https://smartbrew.in/SmartBrew Neon logo-01.png",
      "description": "SmartBrew Solutions is a leading technology company specializing in sales automation, CRM solutions, and business process optimization.",
      "knowsAbout": [
        "Sales Technology",
        "Business Automation", 
        "CRM Solutions",
        "Marketing Automation",
        "Lead Generation",
        "Digital Transformation"
      ]
    }
  };

  return (
    <>
      <SEO 
        title="About Us - SmartBrew Solutions Team & Company Story"
        description="Discover SmartBrew Solutions' mission to transform sales through technology. Meet our expert team, learn our values, and explore our journey in revolutionizing business automation and CRM solutions."
        keywords="about SmartBrew, company story, sales technology team, business automation experts, CRM specialists, digital transformation company, SmartBrew mission"
        url="https://smartbrew.in/about"
        schema={aboutSchema}
      />
      <div>
        <div id="hero">
        <AboutHero />
        </div>
        <div id="values">
        <CompanyValues />
        </div>
        <div id="timeline">
        <CompanyTimeline />
        </div>
        <div id="team">
        <TeamSection />
        </div>
      </div>
    </>
  );
};

export default AboutPage;