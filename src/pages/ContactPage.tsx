import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';
import Faq from '../components/contact/Faq';

const ContactPage: React.FC = () => {
  return (
    <div>
      <div className="pt-32 pb-20 bg-dark-950" id="form">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-300">
              Have questions about our services or want to start a project? Reach out to our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <div id="support">
            <ContactInfo />
            </div>
          </div>
        </div>
      </div>
      
      <div id="map">
      <ContactMap />
      </div>
      <div id="faq">
      <Faq />
      </div>
    </div>
  );
};

export default ContactPage;