import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, X, Twitter } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin: string;
  email: string;
  twitter: string;
  message: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Himanshu Pandey",
    position: "CEO & Founder",
    bio: "Himanshu is a visionary leader with a passion for transforming sales and fundraising through technology. With extensive experience in both technology and business development, he founded SMARTBREW to revolutionize how organizations achieve their growth objectives. His innovative approach combines cutting-edge technology with deep sales expertise to create solutions that deliver measurable results.",
    message: "Empowering organizations to achieve their growth objectives through innovative technology solutions.",
    image: "/Employees/Himamshu Pandey CEO.png",
    linkedin: "https://www.linkedin.com/company/smartbrewnow",
    email: "himanshu@smartbrew.in",
    twitter: "https://x.com/smartbrewnow"
  }
];

const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  return (
    <section className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Leader
          </h2>
          <p className="text-lg text-gray-400">
            The visionary behind our innovative solutions
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <div className="md:w-2/5">
                  <div className="h-full">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Right Side - Content */}
                <div className="md:w-3/5 p-8 md:p-12">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{member.name}</h3>
                      <p className="text-secondary-400 text-xl">{member.position}</p>
                    </div>
                    
                    <div className="border-l-4 border-secondary-500 pl-4">
                      <p className="text-gray-300 italic text-lg">
                        "{member.message}"
                      </p>
                    </div>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="flex space-x-6 pt-4">
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-500 transition-colors"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a 
                        href={member.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-500 transition-colors"
                      >
                        <Twitter size={24} />
                      </a>
                      <a 
                        href={`mailto:${member.email}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-500 transition-colors"
                      >
                        <Mail size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;