import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServicesList from '../components/services/ServicesList';
import ServiceProcess from '../components/services/ServiceProcess';
import TechSuccessStory from '../components/services/TechSuccessStory';
import SalesSuccessStory from '../components/services/SalesSuccessStory';
import SEO from '../components/SEO';

const ServicesPage: React.FC = () => {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SmartBrew Solutions Services",
    "description": "Professional sales technology and business automation services including CRM solutions, marketing automation, and business consulting.",
    "provider": {
      "@type": "Organization",
      "name": "SmartBrew Solutions",
      "url": "https://smartbrew.in"
    },
    "serviceType": [
      "Sales Technology Solutions",
      "Business Automation",
      "CRM Implementation",
      "Marketing Automation",
      "Lead Generation",
      "Business Consulting"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SmartBrew Professional Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM Solutions",
            "description": "Custom CRM implementation and optimization for sales teams"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Automation",
            "description": "Automated marketing campaigns and lead nurturing systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sales Consulting",
            "description": "Strategic sales process optimization and training"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO 
        title="Professional Services - Sales Technology & Business Automation"
        description="Comprehensive sales technology services including CRM solutions, marketing automation, lead generation, and business consulting. Transform your sales process with SmartBrew's expert services."
        keywords="professional services, sales technology services, CRM implementation, marketing automation services, business consulting, lead generation services, sales process optimization"
        url="https://smartbrew.in/services"
        schema={servicesSchema}
      />
      <div>
        <ServicesHero />
        
        {/* Services List Section */}
        <div id="services">
          <ServicesList />
        </div>
        
        {/* Success Stories Section */}
        <div id="success-stories" className="bg-dark-950 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-gray-400">
                Real results from our clients' experiences
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tech Success Story */}
              <div id="tech" className="h-full">
                <TechSuccessStory />
              </div>
              
              {/* Sales Success Story */}
              <div id="sales" className="h-full">
                <SalesSuccessStory />
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Process Section */}
        <div id="process">
          <ServiceProcess />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;