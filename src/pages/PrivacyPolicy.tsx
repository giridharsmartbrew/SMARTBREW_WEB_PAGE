import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Privacy Policy</h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              At SmartBrew Solutions ("SmartBrew", "we", "us", or "our"), your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you use our websites, platforms, services, and applications (collectively, the "Services"), including but not limited to smartbrew.in and its subdomains.
            </p>
            <p>
              By accessing or using our Services, you agree to the practices described in this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Who We Are</h2>
            <p>
              SmartBrew Solutions is a performance-driven technology company helping businesses and organisations optimize outreach, manage relationships, and raise resources through innovative, insight-driven digital products and services. In addition to businesses and organisations SmartBrew's digital products and services are directed at creating value for individual customers.
            </p>
            <p>
              We operate globally, and our users include individuals and business and nonprofit partners, sales professionals, customers and donors, volunteers etc.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We collect different types of information depending on how you interact with us:
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">a. Information You Provide Directly</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number, organization, and designation</li>
              <li>Payment and billing details (only where applicable)</li>
              <li>Donation preferences or campaign participation</li>
              <li>Communications and interactions with our team or platforms</li>
              <li>Resume, role preference, or other information if applying for a job or internship</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">b. Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address, browser type, device type, and operating system</li>
              <li>Access times and pages viewed</li>
              <li>Referring URL and location (based on IP)</li>
              <li>Clickstream and user interaction data on our website or tools</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">c. Third-Party Sources</h3>
            <p>We may receive personal data from:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Social media platforms (e.g., if you engage with our Instagram, LinkedIn, or Facebook campaigns)</li>
              <li>Publicly available sources or event sign-ups</li>
              <li>Databases provided by our client organizations (in compliance with applicable laws)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We use personal information to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our Services</li>
              <li>Personalize user experience and communication</li>
              <li>Facilitate lead management, assignment, and donor interactions</li>
              <li>Process donations, subscriptions, or service requests</li>
              <li>Respond to inquiries, feedback, and support requests</li>
              <li>Comply with legal obligations</li>
              <li>Analyze engagement and improve outreach strategies</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Legal Basis for Processing (for EU and other regions where required)</h2>
            <p>
              We collect and process your data based on:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your consent</li>
              <li>The performance of a contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Our legitimate interest (e.g., marketing, business development, donor outreach)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies, pixels, and similar technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Track user activity on our websites and platforms</li>
              <li>Analyze traffic patterns</li>
              <li>Enhance usability and performance</li>
            </ul>
            <p>
              You can modify your cookie preferences via your browser settings or cookie banner (where applicable).
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Sharing & Disclosure</h2>
            <p>
              We do not sell your data. However, we may share it with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers assisting in operations (e.g., hosting, analytics, payment gateways)</li>
              <li>Partner organizations (e.g., Businesses, NGOs or sales clients you interact with)</li>
              <li>Law enforcement or regulators, if required by law</li>
              <li>Third-party platforms you voluntarily engage with (e.g., fundraisers or CRM tools)</li>
            </ul>
            <p>
              All partners and processors are contractually bound to maintain the confidentiality and security of your data.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention</h2>
            <p>
              We retain your data only as long as necessary for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The purpose it was collected</li>
              <li>Legal, accounting, or reporting obligations</li>
              <li>Platform functionality or user account continuity</li>
            </ul>
            <p>
              You can request deletion, and we will honor it unless legally or contractually obligated to retain the data.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access or correct your personal data</li>
              <li>Object to processing or withdraw consent</li>
              <li>Request deletion ("Right to be Forgotten")</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with your data protection authority</li>
            </ul>
            <p>
              To exercise your rights, please contact us at contact@smartbrew.in
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Data Security</h2>
            <p>
              We implement appropriate technical and organizational safeguards to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, no method of transmission over the internet or storage is 100% secure. You share your data with us at your own risk.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Children's Privacy</h2>
            <p>
              Our Services are not directed toward children under the age of 13 (or under 16 where applicable by law). We do not knowingly collect personal data from children. If we learn that we have done so, we will delete it promptly.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Cross-Border Data Transfers</h2>
            <p>
              SmartBrew operates globally. Your data may be transferred to, stored, and processed in countries outside your own. We ensure appropriate safeguards (such as standard contractual clauses) are in place where required.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Updates will be posted on this page with a new "Last Updated" date. Your continued use of the Services after changes indicates acceptance.
            </p>
            <p>
              If you have any questions, concerns, or requests regarding your privacy or this Policy, please contact us at:
            </p>
            <p className="mt-4">
              <strong>SmartBrew Solutions</strong><br />
              📧 contact@smartbrew.in<br />
              🌐 https://smartbrew.in
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 