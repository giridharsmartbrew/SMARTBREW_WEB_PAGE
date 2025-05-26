import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Terms of Service</h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              Welcome to SmartBrew Solutions! These Terms of Service ("Terms") govern your access to and use of all websites, mobile applications, platforms, products, and services offered by SmartBrew Solutions ("SmartBrew," "we," "our," or "us"), including but not limited to smartbrew.in and its subdomains (collectively, the "Services").
            </p>
            <p>
              By using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Services, you confirm that you can form a legally binding contract under applicable law and that you have read, understood, and agreed to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Scope of Services</h2>
            <p>
              SmartBrew Solutions provides technology platforms, data-driven products, and consulting services to support sales, fundraising, digital outreach, performance apps, lead management, and impact-driven initiatives for organizations globally.
            </p>
            <p>
              Our Services are subject to change without notice and may vary by geography and user role (e.g. enterprise, business, nonprofit, executive, or volunteer).
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Eligibility</h2>
            <p>
              You must be at least 18 years old or the age of majority in your jurisdiction to use our Services. If you are using our Services on behalf of an organization, you represent and warrant that you are authorized to accept these Terms on its behalf.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Accounts</h2>
            <p>
              To access certain Services, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Keep your login credentials confidential</li>
              <li>Notify us immediately of any unauthorized access or suspected breach</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Acceptable Use</h2>
            <p>
              You agree not to misuse the Services or help anyone else do so. Misuse includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accessing or using the Services for any unlawful purpose</li>
              <li>Impersonating others or misrepresenting your affiliation</li>
              <li>Introducing viruses, spam, or malicious code</li>
              <li>Reverse engineering or copying source code</li>
              <li>Violating intellectual property rights</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Payments & Subscriptions</h2>
            <p>
              Certain Services may be offered on a paid basis. All fees are stated in the applicable currency and are exclusive of taxes unless stated otherwise.
            </p>
            <p>
              You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate billing and contact information</li>
              <li>Pay all fees due under your account</li>
              <li>Comply with any specific service-level agreements or billing terms</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate access for non-payment.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
            <p>
              All content, trademarks, logos, tools, technology, and materials provided through the Services are owned by or licensed to SmartBrew and are protected by international intellectual property laws.
            </p>
            <p>
              You may not use, copy, reproduce, or distribute any content without express written permission.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Services</h2>
            <p>
              Our Services may integrate or link with third-party platforms. SmartBrew is not responsible for the availability, accuracy, or practices of such third parties. Your use of those services is governed by their terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Privacy</h2>
            <p>
              Your privacy matters to us. Our collection and use of your personal data is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Disclaimer of Warranties</h2>
            <p>
              The Services are provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>That the Services will be error-free, secure, or uninterrupted</li>
              <li>That results from using the Services will meet your expectations</li>
              <li>Any warranties of merchantability or fitness for a particular purpose</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SmartBrew shall not be liable for any indirect, incidental, special, or consequential damages, including loss of revenue, profits, data, or use, arising out of or in connection with the Services or these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Termination</h2>
            <p>
              We may suspend or terminate your access to the Services at any time, without notice or liability, for conduct that we believe violates these Terms or is harmful to other users, third parties, or us.
            </p>
            <p>
              You may also terminate your use at any time. Any provisions intended to survive termination (such as intellectual property rights, indemnification, and limitation of liability) shall remain in effect.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">13. Indemnification</h2>
            <p>
              You agree to indemnify and hold SmartBrew, its affiliates, officers, employees, consultants, and agents harmless from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Services, violation of these Terms, or infringement of any rights.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">14. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, unless otherwise required by law.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">15. Modifications</h2>
            <p>
              We may update these Terms from time to time. We will post the updated Terms on our website and update the "Last Updated" date. Continued use of the Services constitutes acceptance of the revised Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">16. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding these Terms, please contact us at:
            </p>
            <p className="mt-4">
              <strong>SmartBrew Solutions</strong><br />
              📧 contact@smartbrew.in
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService; 