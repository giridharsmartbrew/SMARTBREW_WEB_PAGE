import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, RefreshCw, Eye, Trash2, Download } from 'lucide-react';

// Define types for our data
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  user_id: string;
}

interface CareerApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  applied_position: string;
  resume_url: string;
  cover_letter: string | null;
  created_at: string;
}

interface QuickChatSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Admin roles
const ADMIN_EMAILS = ['himanshu@smartbrew.in', 'giridhar.chennuru@smartbrew.in', 'hr@smartbrew.in']; // Admin credentials

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'contacts' | 'newsletter' | 'applications' | 'quickchat'>('contacts');
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [quickchats, setQuickchats] = useState<QuickChatSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  const isAdmin = user && user.email ? ADMIN_EMAILS.includes(user.email) : false;

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!user) {
      navigate('/signin?redirect=admin');
      return;
    }
    
    if (!isAdmin) {
      console.log('User is not admin:', user.email, 'Admin emails:', ADMIN_EMAILS);
      setError('You do not have admin privileges to view this page.');
      return;
    }

    console.log('Admin access granted for:', user.email);
    // Load initial data
    fetchData(activeTab);
  }, [user, isAdmin, activeTab, navigate]);

  const fetchData = async (tab: 'contacts' | 'newsletter' | 'applications' | 'quickchat') => {
    setLoading(true);
    setError(null);
    
    try {
      switch (tab) {
        case 'contacts':
          const { data: contactsData, error: contactsError } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (contactsError) throw new Error(contactsError.message);
          setContacts(contactsData || []);
          break;
          
        case 'newsletter':
          const { data: newsletterData, error: newsletterError } = await supabase
            .from('newsletter_subscriptions')
            .select('*');
            
          if (newsletterError) throw new Error(newsletterError.message);
          setNewsletters(newsletterData || []);
          break;
          
        case 'applications':
          const { data: applicationsData, error: applicationsError } = await supabase
            .from('career_applications')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (applicationsError) throw new Error(applicationsError.message);
          setApplications(applicationsData || []);
          break;
          
        case 'quickchat':
          const { data: quickchatData, error: quickchatError } = await supabase
            .from('quickchat')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (quickchatError) throw new Error(quickchatError.message);
          setQuickchats(quickchatData || []);
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string, type: 'contacts' | 'newsletter' | 'applications' | 'quickchat') => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }
    
    try {
      let table = '';
      switch (type) {
        case 'contacts': table = 'contact_submissions'; break;
        case 'newsletter': table = 'newsletter_subscriptions'; break;
        case 'applications': table = 'career_applications'; break;
        case 'quickchat': table = 'quickchat'; break;
      }
      
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
        
      if (error) throw new Error(error.message);
      
      // Refresh data after deletion
      fetchData(type);
      
      alert('Item deleted successfully');
    } catch (err) {
      alert(`Error deleting item: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Error deleting item:', err);
    }
  };

  // Function to export data as CSV
  const exportAsCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }
    
    // Create CSV headers from first object's keys
    const headers = Object.keys(data[0]);
    
    // Convert data to CSV format
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle special cases like null values and strings with commas
          if (value === null) return '';
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ];
    
    // Join rows with newlines
    const csvString = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to view resume
  const viewResume = async (url: string) => {
    try {
      // Check if URL is already a fully qualified URL
      if (url.startsWith('http')) {
        window.open(url, '_blank');
        return;
      }
      
      // Get just the filename if it's a full path
      const fileName = url.includes('/') ? url.split('/').pop() : url;
      
      // The bucket name is 'applicationresumes' based on the error
      const { data, error } = await supabase
        .storage
        .from('applicationresumes')
        .createSignedUrl(fileName || url, 60); // 60 seconds expiry
      
      if (error) {
        console.error('Error getting resume URL:', error);
        alert('Could not access the resume file. Please try again.');
        return;
      }
      
      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      } else {
        alert('Resume URL is invalid.');
      }
    } catch (err) {
      console.error('Error opening resume:', err);
      alert('Error opening resume file.');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!user) {
    return <div>Redirecting to login...</div>;
  }
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Shield className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-xl text-gray-400">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-500" />
            Admin Dashboard
          </h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2 text-white" />
            Exit Dashboard
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        {/* Tabs */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg mb-6">
          <div className="flex border-b border-gray-700">
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'contacts' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('contacts')}
            >
              Contact Submissions
            </button>
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'newsletter' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('newsletter')}
            >
              Newsletter Subscriptions
            </button>
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'applications' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('applications')}
            >
              Job Applications
            </button>
            <button 
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'quickchat' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('quickchat')}
            >
              Quick Chat Submissions
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-white">
                {activeTab === 'contacts' && 'Contact Form Submissions'}
                {activeTab === 'newsletter' && 'Newsletter Subscriptions'}
                {activeTab === 'applications' && 'Job Applications'}
                {activeTab === 'quickchat' && 'Quick Chat Submissions'}
              </h2>
              <div className="flex space-x-3">
                <button 
                  onClick={() => fetchData(activeTab)} 
                  className="flex items-center text-sm text-gray-400 hover:text-blue-400"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh
                </button>
                <button 
                  onClick={() => {
                    if (activeTab === 'contacts') exportAsCSV(contacts, 'contacts-export');
                    if (activeTab === 'newsletter') exportAsCSV(newsletters, 'newsletter-export');
                    if (activeTab === 'applications') exportAsCSV(applications, 'applications-export');
                    if (activeTab === 'quickchat') exportAsCSV(quickchats, 'quickchat-export');
                  }} 
                  className="flex items-center text-sm text-gray-400 hover:text-blue-400"
                  disabled={
                    (activeTab === 'contacts' && contacts.length === 0) ||
                    (activeTab === 'newsletter' && newsletters.length === 0) ||
                    (activeTab === 'applications' && applications.length === 0) ||
                    (activeTab === 'quickchat' && quickchats.length === 0)
                  }
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export CSV
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Contacts Table */}
                {activeTab === 'contacts' && (
                  <>
                    {contacts.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No contact submissions found.</p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {contacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-750">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{contact.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{contact.email}</td>
                              <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{contact.message}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(contact.created_at)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
                                <button
                                  onClick={() => deleteItem(contact.id, 'contacts')}
                                  className="text-red-400 hover:text-red-300 ml-3"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
                
                {/* Newsletter Table */}
                {activeTab === 'newsletter' && (
                  <>
                    {newsletters.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No newsletter subscriptions found.</p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User ID</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {newsletters.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-750">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{sub.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sub.user_id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
                                <button
                                  onClick={() => deleteItem(sub.id, 'newsletter')}
                                  className="text-red-400 hover:text-red-300 ml-3"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
                
                {/* Applications Table */}
                {activeTab === 'applications' && (
                  <>
                    {applications.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No job applications found.</p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-750">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{app.full_name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{app.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{app.applied_position}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(app.created_at)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right flex justify-end">
                                <button
                                  onClick={() => viewResume(app.resume_url)}
                                  className="text-blue-400 hover:text-blue-300"
                                  title="View Resume"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteItem(app.id, 'applications')}
                                  className="text-red-400 hover:text-red-300 ml-3"
                                  title="Delete Application"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
                
                {/* Quick Chat Table */}
                {activeTab === 'quickchat' && (
                  <>
                    {quickchats.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No quick chat submissions found.</p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {quickchats.map((chat) => (
                            <tr key={chat.id} className="hover:bg-gray-750">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{chat.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{chat.email}</td>
                              <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{chat.message}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(chat.created_at)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
                                <button
                                  onClick={() => deleteItem(chat.id, 'quickchat')}
                                  className="text-red-400 hover:text-red-300 ml-3"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 