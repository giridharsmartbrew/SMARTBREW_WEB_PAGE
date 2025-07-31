import { useState, Fragment, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, X, Upload, LogIn, Settings } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const jobOpenings: JobOpening[] = [
  // Sales Positions (IDs 1-3)
  {
    id: 1,
    title: "Impact Sales Executive",
    department: "Sales",
    location: "Gurugram, India",
    type: "Full-time",
    description: "As an Impact Sales Executive at SMARTBREW Solutions, you will support nonprofit organizations by generating resources, fostering relationships, and contributing to community and national development.",
    requirements: [
      "0-2 years of work experience",
      "Goal-oriented with a track record of achieving targets",
      "Excellent communication skills to inspire and persuade",
      "Strong relationship-building skills",
      "Collaborative team player",
      "Creative and adaptable in strategy implementation"
    ],
    benefits: [
      "Opportunity to contribute to impactful causes.",
      "Comprehensive training in fundraising and sales.",
      "Professional development and career advancement opportunities.",
      "Supportive and collaborative work environment.",
      "Competitive salary with performance-based bonuses."
    ]
  },
  {
    id: 2,
    title: "Impact Sales Intern",
    department: "Sales",
    location: "Gurugram, India",
    type: "Internship (2-6 months)",
    description: "Are you driven by purpose and looking to create a meaningful impact while building a rewarding career? As an Impact Sales Intern at SMARTBREW Solutions, you will play a crucial role in supporting nonprofit organizations by generating resources, fostering relationships, and helping to transform lives, communities, and contribute towards nation building.",
    requirements: [
      "Purpose-Driven: You're passionate about making a difference and supporting charitable causes",
      "Hungry for Success: You thrive on achieving goals and creating meaningful outcomes",
      "Exceptional Communicator: You can inspire action through clear, persuasive communication",
      "Relationship Builder: You excel at connecting with people and building trust",
      "Team Player: You collaborate effectively and contribute to collective success",
      "Adaptable: You think creatively and adjust strategies to achieve results",
      "Active on social media platforms"
    ],
    benefits: [
      "Stipend: ₹7,000/- per month",
      "Hands-on experience in impact-driven sales",
      "Opportunity to contribute directly to charitable initiatives",
      "Skill development in fundraising and relationship building",
      "Professional networking with nonprofit organizations",
      "Experience in campaign planning and execution",
      "Full-time in-office internship experience"
    ]
  },
  {
    id: 3,
    title: "Impact Sales Intern",
    department: "Sales",
    location: "Patna, India",
    type: "Internship (2-6 months)",
    description: "Are you driven by purpose and looking to create a meaningful impact while building a rewarding career? As an Impact Sales Intern at SMARTBREW Solutions, you will play a crucial role in supporting nonprofit organizations by generating resources, fostering relationships, and helping to transform lives, communities, and contribute towards nation building.",
    requirements: [
      "Purpose-Driven: You're passionate about making a difference and supporting charitable causes",
      "Hungry for Success: You thrive on achieving goals and creating meaningful outcomes",
      "Exceptional Communicator: You can inspire action through clear, persuasive communication",
      "Relationship Builder: You excel at connecting with people and building trust",
      "Team Player: You collaborate effectively and contribute to collective success",
      "Adaptable: You think creatively and adjust strategies to achieve results",
      "Active on social media platforms"
    ],
    benefits: [
      "Stipend: ₹5,000 - 7,000/- per month",
      "Hands-on experience in impact-driven sales",
      "Opportunity to contribute directly to charitable initiatives",
      "Skill development in fundraising and relationship building",
      "Professional networking with nonprofit organizations",
      "Experience in campaign planning and execution",
      "Full-time in-office internship experience"
    ]
  },
  // Engineering Positions (IDs 4-6)
  {
    id: 4,
    title: "Python Backend Developer Intern",
    department: "Engineering",
    location: "Gurugram, India",
    type: "Internship (3-6 months)",
    description: "We are seeking a highly motivated Backend Developer Intern with a strong foundation in Python, Django, MySQL, and MongoDB. You will work with our engineering team to build robust APIs, manage databases, and ensure the backend architecture supports a seamless user experience across our platforms.",
    requirements: [
      "Proficiency in Python and hands-on experience with the Django framework",
      "Strong working knowledge of MySQL and MongoDB",
      "Familiarity with building and consuming RESTful APIs",
      "Understanding of Git and version control workflows",
      "Analytical thinking, problem-solving mindset, and attention to detail",
      "Currently pursuing or recently completed a degree in Computer Science, IT, or related field"
    ],
    benefits: [
      "Stipend: ₹7,000/- per month",
      "Real-world experience working on scalable backend projects",
      "Opportunity to learn from and collaborate with experienced developers",
      "Exposure to agile methodologies and DevOps workflows",
      "Certificate of Internship and Letter of Recommendation upon completion",
      "Potential offer for full-time employment based on performance"
    ]
  },
  {
    id: 5,
    title: "DevOps Intern",
    department: "Engineering",
    location: "Gurugram, India",
    type: "Internship (3-6 months)",
    description: "We are looking for a detail-oriented and proactive DevOps Intern to assist in managing and automating deployment processes, monitoring systems, and improving development operations. This role will provide hands-on experience with tools and practices in modern DevOps environments.",
    requirements: [
      "Basic understanding of Linux-based systems and command-line operations",
      "Familiarity with Docker, CI/CD tools, and version control (Git)",
      "Good knowledge of scripting languages like Bash or Python",
      "Understanding of cloud computing concepts (AWS/GCP/Azure – even at beginner level)",
      "Problem-solving attitude and eagerness to learn modern DevOps practices",
      "Pursuing or recently completed a degree in Computer Science, IT, or related field"
    ],
    benefits: [
      "Stipend: ₹7,000/- per month",
      "Practical experience with real-world DevOps practices and tools",
      "Mentorship and guidance from experienced DevOps and engineering professionals",
      "Hands-on exposure to cloud infrastructure and automation",
      "Certificate of Internship and Letter of Recommendation upon completion",
      "Potential opportunity for full-time employment based on performance"
    ]
  },
  {
    id: 6,
    title: "React Frontend Developer Intern",
    department: "Engineering",
    location: "Gurugram, India",
    type: "Internship (3-6 months)",
    description: "At SMARTBREW Solutions Pvt Ltd, we are seeking a motivated and detail-oriented React Frontend Developer Intern to join our growing team in Gurugram. This role is ideal for someone looking to gain hands-on experience in building modern web applications using React.js. You'll work closely with our design and backend teams to deliver seamless, performant, and user-centric interfaces.",
    requirements: [
      "Proficiency in JavaScript, HTML5, CSS3",
      "Hands-on experience with React.js, including hooks and functional components",
      "Familiarity with Git and version control workflows",
      "Understanding of REST APIs and asynchronous operations",
      "Strong problem-solving and communication skills",
      "Pursuing or recently completed a degree in Computer Science, IT, or related field"
    ],
    benefits: [
      "Stipend: ₹7,000/- per month",
      "Hands-on experience working on real-world web applications",
      "Exposure to agile workflows and development lifecycle",
      "Mentorship from experienced engineers and technical leaders",
      "Certificate of Internship and Letter of Recommendation upon completion",
      "Potential opportunity for full-time employment based on performance"
    ]
  }
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  coverLetter: string;
}

const CareerPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    coverLetter: ''
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'voice') => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === 'resume') {
      if (file.type === 'application/pdf' || file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
      } else {
        alert('Please upload a PDF or Word document for resume');
      }
    } else if (type === 'voice') {
      if (file.type.startsWith('audio/')) {
        setVoiceFile(file);
      } else {
        alert('Please upload a valid audio file');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openApplicationModal = (job: JobOpening) => {
    if (!user) {
      // Store job info in session storage before redirecting
      sessionStorage.setItem('selectedJobId', job.id.toString());
      navigate('/signin?redirect=careers');
      return;
    }
    
    setSelectedJob(job);
    setIsModalOpen(true);
    // Reset form when opening modal
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      linkedIn: '',
      coverLetter: ''
    });
    setResumeFile(null);
    setVoiceFile(null);
    setUploadStatus('idle');
    setErrorMessage(null);
  };

  // Load session data if returning from authentication
  useEffect(() => {
    if (user) {
      const selectedJobId = sessionStorage.getItem('selectedJobId');
      if (selectedJobId) {
        const jobId = parseInt(selectedJobId);
        const job = jobOpenings.find(j => j.id === jobId);
        if (job) {
          setSelectedJob(job);
          setIsModalOpen(true);
          sessionStorage.removeItem('selectedJobId');
        }
      }
    }
  }, [user]);

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form state when closing modal
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      linkedIn: '',
      coverLetter: ''
    });
    setResumeFile(null);
    setVoiceFile(null);
    setUploadStatus('idle');
    setErrorMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Check if user is authenticated
    if (!user) {
      setErrorMessage('Please sign in to submit your application');
      return;
    }
    
    // Form validation
    setErrorMessage(null);
    
    // Required fields check
    if (!formData.fullName.trim()) {
      setErrorMessage('Full name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage('Email address is required');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    if (!resumeFile) {
      setErrorMessage('Please upload your resume');
      return;
    }

    setUploadStatus('uploading');
    
    try {
      // Upload resume file to Storage
      const resumeFileName = `${Date.now()}_${resumeFile.name}`;
      const { data: resumeData, error: resumeError } = await supabase.storage
        .from('applicationresumes')
        .upload(resumeFileName, resumeFile);
      
      if (resumeError) {
        throw new Error(`Resume upload failed: ${resumeError.message}`);
      }
      
      // Get public URL for resume
      const { data: resumeUrlData } = await supabase.storage
        .from('applicationresumes')
        .getPublicUrl(resumeFileName);
        
      const resumeUrl = resumeUrlData?.publicUrl || '';
      
      if (!resumeUrl) {
        throw new Error('Failed to get resume URL');
      }

      // Upload voice file if provided
      let voiceUrl = '';
      if (voiceFile) {
        const voiceFileName = `${Date.now()}_${voiceFile.name}`;
        const { data: voiceData, error: voiceError } = await supabase.storage
          .from('applicationintrovoices')
          .upload(voiceFileName, voiceFile);
        
        if (voiceError) {
          throw new Error(`Voice file upload failed: ${voiceError.message}`);
        }
        
        const { data: voiceUrlData } = await supabase.storage
          .from('applicationintrovoices')
          .getPublicUrl(voiceFileName);
          
        voiceUrl = voiceUrlData?.publicUrl || '';
      }
      
      // Submit application data
      const formDataToSubmit = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        applied_position: selectedJob?.title || '',
        resume_url: resumeUrl,
        voice_url: voiceUrl || null,
        cover_letter: formData.coverLetter || ''
      };
      
      const { error: applicationError } = await supabase
        .from('career_applications')
        .insert([formDataToSubmit]);

      if (applicationError) {
        throw new Error(`Application submission failed: ${applicationError.message}`);
      }

      setUploadStatus('success');
      
      // We wait a bit before closing the modal to show the success message
      setTimeout(() => {
        closeModal();
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 my-mobile"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
           We're looking for passionate individuals who wil help us revolutionize the smartbrew experience.
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-12 mb-16 mx-mobile" id="jobs">
          {/* Sales Jobs Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-blue-400" />
              Sales Opportunities
            </h2>
            <div className="space-y-6">
              {jobOpenings.filter(job => job.department === "Sales").map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: job.id * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-blue-400" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <button className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    {expandedJob === job.id ? 'Show Less' : 'Show More'}
                    <ArrowRight className={`w-4 h-4 ml-2 transform transition-transform ${expandedJob === job.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
                
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-700"
                  >
                    <p className="text-gray-300 mb-6">{job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-8 flex-col-mobile">
                      <div>
                            <h4 className="font-semibold text-white mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              <span className="text-gray-300">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                            <h4 className="font-semibold text-white mb-3">Benefits</h4>
                        <ul className="space-y-2">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              <span className="text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-8 text-center"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openApplicationModal(job);
                        }}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-flex items-center"
                      >
                        {user ? 'Apply for this position' : 'Sign in to apply'}
                        {user ? <ArrowRight className="ml-2 h-4 w-4" /> : <LogIn className="ml-2 h-4 w-4" />}
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
            </div>
          </div>

          {/* Engineering Jobs Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-blue-400" />
              Engineering Opportunities
            </h2>
            <div className="space-y-6">
              {jobOpenings.filter(job => job.department === "Engineering").map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: job.id * 0.1 }}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-colors"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Settings className="w-4 h-4 mr-2 text-blue-400" />
                            {job.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-blue-400" />
                            {job.type}
                          </div>
                        </div>
                      </div>
                      <button className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                        {expandedJob === job.id ? 'Show Less' : 'Show More'}
                        <ArrowRight className={`w-4 h-4 ml-2 transform transition-transform ${expandedJob === job.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                    
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-700"
                      >
                        <p className="text-gray-300 mb-6">{job.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-8 flex-col-mobile">
                          <div>
                            <h4 className="font-semibold text-white mb-3">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-400 mr-2">•</span>
                                  <span className="text-gray-300">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-white mb-3">Benefits</h4>
                            <ul className="space-y-2">
                              {job.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-400 mr-2">•</span>
                                  <span className="text-gray-300">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-8 text-center"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openApplicationModal(job);
                            }}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-flex items-center"
                          >
                            {user ? 'Apply for this position' : 'Sign in to apply'}
                            {user ? <ArrowRight className="ml-2 h-4 w-4" /> : <LogIn className="ml-2 h-4 w-4" />}
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Modal */}
        <AnimatePresence>
          {isModalOpen && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={closeModal}
              id="application"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-gray-800 rounded-xl w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl mx-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header - Fixed */}
                <div className="flex justify-between items-center border-b border-gray-700 p-4 sm:p-6 bg-gray-800 flex-shrink-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-white truncate pr-4">
                      Apply: {selectedJob.title}
                    </h2>
                    <button 
                      onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
                    >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                  
                {/* Modal body - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                  {/* Mobile Layout: Stack vertically */}
                  <div className="block lg:hidden">
                    {/* Job Details Section - Mobile */}
                    <div className="p-4 sm:p-6 border-b border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                        Job Details
                      </h3>
                      
                      <div className="mb-6">
                        <h4 className="text-base font-medium text-white mb-2">About the position</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{selectedJob.description}</p>
                        </div>
                        
                        <div className="mb-6">
                        <h4 className="text-base font-medium text-white mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {selectedJob.requirements.map((req, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                              <span className="text-gray-300">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-base font-medium text-white mb-3">Benefits</h4>
                        <ul className="space-y-2">
                          {selectedJob.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                              <span className="text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Application Form Section - Mobile */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Upload className="w-5 h-5 mr-2 text-blue-400" />
                        Apply Now
                      </h3>
                      
                      {!user ? (
                        <div className="flex flex-col items-center justify-center py-8">
                          <LogIn size={32} className="text-blue-500 mb-4" />
                          <h4 className="text-lg font-medium text-white mb-3">Authentication Required</h4>
                          <p className="text-gray-400 text-center mb-6 text-sm">
                            You need to be signed in to submit a job application.
                          </p>
                          <Link
                            to="/signin?redirect=careers"
                            className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            Sign In <LogIn size={18} className="ml-2" />
                          </Link>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {errorMessage && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm"
                            >
                              {errorMessage}
                            </motion.div>
                          )}
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Position Applied For
                            </label>
                            <input
                              type="text"
                              value={selectedJob.title}
                              disabled
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white opacity-75 text-sm"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                LinkedIn Profile
                              </label>
                              <input
                                type="url"
                                name="linkedIn"
                                value={formData.linkedIn}
                                onChange={handleInputChange}
                                placeholder="https://linkedin.com/in/yourprofile"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Cover Letter
                            </label>
                            <textarea
                              name="coverLetter"
                              value={formData.coverLetter}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="Tell us why you're excited to work with SMARTBREW..."
                            ></textarea>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Resume (PDF or Word) *
                            </label>
                            <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-700 border-dashed rounded-lg hover:border-blue-500/50 transition-colors">
                              <div className="space-y-1 text-center">
                                <div className="flex flex-col items-center">
                                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                  <label
                                    htmlFor="resume-upload-mobile"
                                    className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none text-sm"
                                  >
                                    <span>Upload Resume</span>
                                    <input
                                      id="resume-upload-mobile"
                                      name="resume-upload"
                                      type="file"
                                      accept=".pdf,.doc,.docx"
                                      onChange={(e) => handleFileChange(e, 'resume')}
                                      className="sr-only"
                                    />
                                  </label>
                                </div>
                                {resumeFile && (
                                  <p className="text-sm text-blue-300 break-all">
                                    {resumeFile.name}
                                  </p>
                                )}
                                {!resumeFile && (
                                  <p className="text-xs text-gray-500">
                                    PDF, DOC or DOCX up to 10MB
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Voice Introduction (optional)
                            </label>
                            <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-700 border-dashed rounded-lg hover:border-blue-500/50 transition-colors">
                              <div className="space-y-1 text-center">
                                <div className="flex flex-col items-center">
                                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                  <label
                                    htmlFor="voice-upload"
                                    className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none text-sm"
                                  >
                                    <span>Upload Voice File</span>
                                    <input
                                      id="voice-upload"
                                      name="voice-upload"
                                      type="file"
                                      accept="audio/*"
                                      onChange={(e) => handleFileChange(e, 'voice')}
                                      className="sr-only"
                                    />
                                  </label>
                                </div>
                                {voiceFile && (
                                  <p className="text-sm text-blue-300 break-all">
                                    {voiceFile.name}
                                  </p>
                                )}
                                {!voiceFile && (
                                  <p className="text-xs text-gray-500">
                                    MP3, WAV, M4A up to 10MB
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <button
                              type="submit"
                              disabled={uploadStatus === 'uploading'}
                              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors text-sm
                                ${uploadStatus === 'uploading'
                                  ? 'bg-gray-600 cursor-not-allowed'
                                  : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                              {uploadStatus === 'uploading' ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                            
                            {uploadStatus === 'success' && (
                              <motion.p 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="text-green-400 text-center mt-4 text-sm"
                              >
                                Application submitted successfully! We'll be in touch soon.
                              </motion.p>
                            )}
                            
                            {uploadStatus === 'error' && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-center mt-4 text-sm"
                              >
                                <p>Error submitting application.</p>
                                {errorMessage && <p className="text-sm mt-1">{errorMessage}</p>}
                                <p className="text-sm mt-1">Please try again or contact support if the issue persists.</p>
                              </motion.div>
                            )}
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Desktop Layout: Side by side */}
                  <div className="hidden lg:flex h-full">
                    {/* Left side - Job details */}
                    <div className="w-1/2 p-6 border-r border-gray-700">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-2">About the position</h3>
                          <p className="text-gray-300">{selectedJob.description}</p>
                        </div>
                        
                        <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-2">Requirements</h3>
                          <ul className="space-y-2">
                            {selectedJob.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                <span className="text-gray-300">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                        <h3 className="text-lg font-medium text-white mb-2">Benefits</h3>
                          <ul className="space-y-2">
                            {selectedJob.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                <span className="text-gray-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Right side - Application form */}
                    <div className="w-1/2 p-6">
                        {!user ? (
                          <div className="flex flex-col items-center justify-center h-full p-6">
                            <LogIn size={40} className="text-blue-500 mb-4" />
                            <h3 className="text-xl font-medium text-white mb-3">Authentication Required</h3>
                            <p className="text-gray-400 text-center mb-6">
                              You need to be signed in to submit a job application.
                            </p>
                            <Link
                              to="/signin?redirect=careers"
                              className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                              Sign In <LogIn size={18} className="ml-2" />
                            </Link>
                          </div>
                        ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errorMessage && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm mb-4"
                              >
                                {errorMessage}
                              </motion.div>
                            )}
                            
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Position Applied For
                              </label>
                              <input
                                type="text"
                                value={selectedJob.title}
                                disabled
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent opacity-75"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              LinkedIn Profile
                            </label>
                            <input
                              type="url"
                              name="linkedIn"
                              value={formData.linkedIn}
                              onChange={handleInputChange}
                              placeholder="https://linkedin.com/in/yourprofile"
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Cover Letter
                            </label>
                            <textarea
                              name="coverLetter"
                              value={formData.coverLetter}
                              onChange={handleInputChange}
                              rows={4}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Tell us why you're excited to work with SMARTBREW..."
                            ></textarea>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Resume (PDF or Word) *
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg hover:border-blue-500/50 transition-colors">
                              <div className="space-y-1 text-center">
                                <div className="flex flex-col items-center">
                                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                  <label
                                    htmlFor="resume-upload-desktop"
                                    className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none"
                                  >
                                    <span>Upload Resume</span>
                                    <input
                                      id="resume-upload-desktop"
                                      name="resume-upload"
                                      type="file"
                                      accept=".pdf,.doc,.docx"
                                      onChange={(e) => handleFileChange(e, 'resume')}
                                      className="sr-only"
                                    />
                                  </label>
                                </div>
                                {resumeFile && (
                                  <p className="text-sm text-blue-300">
                                    {resumeFile.name}
                                  </p>
                                )}
                                {!resumeFile && (
                                  <p className="text-xs text-gray-500">
                                    PDF, DOC or DOCX up to 10MB
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Voice Introduction (optional)
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg hover:border-blue-500/50 transition-colors">
                              <div className="space-y-1 text-center">
                                <div className="flex flex-col items-center">
                                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                  <label
                                    htmlFor="voice-upload"
                                    className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none"
                                  >
                                    <span>Upload Voice File</span>
                                    <input
                                      id="voice-upload"
                                      name="voice-upload"
                                      type="file"
                                      accept="audio/*"
                                      onChange={(e) => handleFileChange(e, 'voice')}
                                      className="sr-only"
                                    />
                                  </label>
                                </div>
                                {voiceFile && (
                                  <p className="text-sm text-blue-300">
                                    {voiceFile.name}
                                  </p>
                                )}
                                {!voiceFile && (
                                  <p className="text-xs text-gray-500">
                                    MP3, WAV, M4A up to 10MB
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <button
                              type="submit"
                              disabled={uploadStatus === 'uploading'}
                              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
                                ${uploadStatus === 'uploading'
                                  ? 'bg-gray-600 cursor-not-allowed'
                                  : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                              {uploadStatus === 'uploading' ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                            
                            {uploadStatus === 'success' && (
                              <motion.p 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="text-green-400 text-center mt-4"
                              >
                                Application submitted successfully! We'll be in touch soon.
                              </motion.p>
                            )}
                            
                            {uploadStatus === 'error' && (
                                <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-center mt-4"
                              >
                                  <p>Error submitting application.</p>
                                  {errorMessage && <p className="text-sm mt-1">{errorMessage}</p>}
                                  <p className="text-sm mt-1">Please try again or contact support if the issue persists.</p>
                                </motion.div>
                            )}
                          </div>
                        </form>
                        )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* General Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mx-mobile"
          id="culture"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Join Our Growing Team</h2>
          <p className="text-gray-300 mb-8">
            We're looking for passionate individuals who will help us revolutionize the SMARTBREW Experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-col-mobile" id="benefits">
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-lg font-medium text-white mb-3">Smart Benefits</h3>
              <p className="text-gray-300">We offer competitive compensation and comprehensive benefits to our team members.</p>
            </div>
            
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-lg font-medium text-white mb-3">Work Culture</h3>
              <p className="text-gray-300">Join our inclusive team where innovation and creativity are encouraged and celebrated.</p>
            </div>
            
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-lg font-medium text-white mb-3">Growth Opportunities</h3>
              <p className="text-gray-300">We invest in our people and provide paths for advancement and professional development.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerPage; 