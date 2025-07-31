import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LogOut, 
  RefreshCw, 
  Download,
  Activity, 
  Users, 
  Globe, 
  Smartphone, 
  Clock, 
  MousePointer,
  Bell
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { 
  ActivityTable, 
  ActivityFilter, 
  UserMetricsCard, 
  RealTimeAlert 
} from '../components/analytics';
import { useActivity } from '../context/ActivityContext';

// Define types
interface UserActivity {
  id: string;
  session_id: string;
  page: string;
  event_type: string;
  timestamp: string;
  ip_address?: string;
  country?: string;
  region?: string;
  city?: string;
  device_type?: string;
  device_model?: string;
  os?: string;
  browser?: string;
  scroll_depth?: number;
  mouse_activity?: boolean;
  metadata?: Record<string, any>;
  user_id?: string;
}

interface Alert {
  id: string;
  type: 'form_submission' | 'pricing_view' | 'contact_view' | 'idle_user';
  message: string;
  timestamp: string;
  data: UserActivity;
}

// Admin emails with access
const ADMIN_EMAILS = ['himanshu@smartbrew.in', 'giridhar.chennuru@smartbrew.in', 'hr@smartbrew.in'];

const ActivityAdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPage, setFilterPage] = useState<string>('all');
  const [filterDevice, setFilterDevice] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  
  // Check if user is admin
  const isAdmin = user && user.email ? ADMIN_EMAILS.includes(user.email) : false;

  // Computed metrics
  const metrics = useMemo(() => {
    if (!activities.length) {
      return {
        totalSessions: 0,
        uniqueVisitors: 0,
        totalPageViews: 0,
        avgTimeOnSite: 0,
        topPages: [],
        topCountries: [],
        deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 }
      };
    }

    // Unique sessions
    const uniqueSessions = new Set(activities.map(a => a.session_id)).size;
    
    // Unique visitors (by session ID or IP)
    // First, try to use IP addresses
    const uniqueIPs = new Set(activities.filter(a => a.ip_address).map(a => a.ip_address)).size;
    
    // If we don't have any IPs, use session IDs for unique visitors
    const uniqueVisitors = uniqueIPs > 0 ? uniqueIPs : uniqueSessions;
    
    // Page views
    const pageViews = activities.filter(a => a.event_type === 'page_visit').length;
    
    // Get page distribution
    const pageVisits = activities.filter(a => a.event_type === 'page_visit');
    const pageCountMap: Record<string, number> = {};
    pageVisits.forEach(visit => {
      const page = visit.page || '/';
      pageCountMap[page] = (pageCountMap[page] || 0) + 1;
    });
    
    // Sort pages by visit count
    const topPages = Object.entries(pageCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));
    
    // Country distribution
    const countryMap: Record<string, number> = {};
    activities.forEach(activity => {
      if (activity.country) {
        countryMap[activity.country] = (countryMap[activity.country] || 0) + 1;
      }
    });
    
    // Sort countries by count
    const topCountries = Object.entries(countryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }));
    
    // Device breakdown
    const deviceMap: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
    activities.forEach(activity => {
      if (activity.device_type && deviceMap[activity.device_type] !== undefined) {
        deviceMap[activity.device_type]++;
      }
    });
    
    // Calculate average time on site
    // This is approximate based on time between first and last event in each session
    const sessionTimeMap: Record<string, { first: Date, last: Date }> = {};
    
    activities.forEach(activity => {
      const timestamp = new Date(activity.timestamp);
      const session = activity.session_id;
      
      if (!sessionTimeMap[session]) {
        sessionTimeMap[session] = { first: timestamp, last: timestamp };
      } else {
        if (timestamp < sessionTimeMap[session].first) {
          sessionTimeMap[session].first = timestamp;
        }
        if (timestamp > sessionTimeMap[session].last) {
          sessionTimeMap[session].last = timestamp;
        }
      }
    });
    
    // Calculate average session duration in seconds
    const sessionDurations = Object.values(sessionTimeMap).map(
      ({ first, last }) => (last.getTime() - first.getTime()) / 1000
    );
    
    const avgTimeOnSite = sessionDurations.length
      ? Math.round(sessionDurations.reduce((sum, time) => sum + time, 0) / sessionDurations.length)
      : 0;
    
    return {
      totalSessions: uniqueSessions,
      uniqueVisitors: uniqueVisitors,
      totalPageViews: pageViews,
      avgTimeOnSite,
      topPages,
      topCountries,
      deviceBreakdown: deviceMap
    };
  }, [activities]);

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!user) {
      navigate('/signin?redirect=activity-admin');
      return;
    }
    
    if (!isAdmin) {
      console.log('User is not admin:', user.email, 'Admin emails:', ADMIN_EMAILS);
      setError('You do not have admin privileges to view this page.');
      return;
    }

    console.log('Admin access granted for:', user.email);
    // Load initial data
    fetchActivityData();
    
    // Set up real-time subscription
    setupRealtimeSubscription();
    
    return () => {
      // Clean up subscription
      supabase.channel('user_activity_changes').unsubscribe();
    };
  }, [user, isAdmin, navigate, timeRange]);

  // Function to set up realtime subscription
  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('user_activity_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_activity',
        },
        (payload) => {
          const newActivity = payload.new as UserActivity;
          
          // Add to activities list
          setActivities(prev => [newActivity, ...prev]);
          
          // Check if this activity should trigger an alert
          checkForAlert(newActivity);
        }
      )
      .subscribe();
      
    return channel;
  };
  
  // Check if an activity should trigger an alert
  const checkForAlert = (activity: UserActivity) => {
    const alerts: Alert[] = [];
    
    // Form submissions
    if (activity.event_type === 'form_submission') {
      alerts.push({
        id: crypto.randomUUID(),
        type: 'form_submission',
        message: `New form submission on ${activity.page}`,
        timestamp: activity.timestamp,
        data: activity
      });
    }
    
    // Pricing page view for more than 1 minute
    if (
      activity.event_type === 'user_active' && 
      activity.page === '/pricing' && 
      activity.metadata?.timeSpent && 
      activity.metadata.timeSpent > 60
    ) {
      alerts.push({
        id: crypto.randomUUID(),
        type: 'pricing_view',
        message: `User spent over 1 minute on Pricing page`,
        timestamp: activity.timestamp,
        data: activity
      });
    }
    
    // Contact page view for more than 1 minute
    if (
      activity.event_type === 'user_active' && 
      activity.page === '/contact' && 
      activity.metadata?.timeSpent && 
      activity.metadata.timeSpent > 60
    ) {
      alerts.push({
        id: crypto.randomUUID(),
        type: 'contact_view',
        message: `User spent over 1 minute on Contact page`,
        timestamp: activity.timestamp,
        data: activity
      });
    }
    
    // Idle user for more than 30 seconds
    if (activity.event_type === 'user_idle') {
      alerts.push({
        id: crypto.randomUUID(),
        type: 'idle_user',
        message: `User went idle on ${activity.page}`,
        timestamp: activity.timestamp,
        data: activity
      });
    }
    
    // Add alerts
    if (alerts.length > 0) {
      setAlerts(prev => [...alerts, ...prev]);
    }
  };

  const fetchActivityData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Calculate the start date based on selected time range
      let startDate;
      switch (timeRange) {
        case '24h':
          startDate = subDays(new Date(), 1).toISOString();
          break;
        case '7d':
          startDate = subDays(new Date(), 7).toISOString();
          break;
        case '30d':
          startDate = subDays(new Date(), 30).toISOString();
          break;
        default:
          startDate = subDays(new Date(), 1).toISOString();
      }
      
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .gte('timestamp', startDate)
        .order('timestamp', { ascending: false })
        .limit(500);
        
      if (error) throw new Error(error.message);
      
      setActivities(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching activity data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  // Export activity data as CSV
  const exportAsCSV = () => {
    if (activities.length === 0) {
      alert('No data to export');
      return;
    }
    
    // Create CSV headers from first object's keys
    const headers = Object.keys(activities[0]);
    
    // Convert data to CSV format
    const csvRows = [
      headers.join(','), // Header row
      ...activities.map(row => 
        headers.map(header => {
          // @ts-ignore - dynamic access
          const value = row[header];
          // Handle special cases like null values, objects, and strings with commas
          if (value === null || value === undefined) return '';
          if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
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
    link.setAttribute('download', `user-activity-${timeRange}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter activities based on selected filters
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      let matches = true;
      
      // Filter by event type
      if (filterType !== 'all') {
        matches = matches && activity.event_type === filterType;
      }
      
      // Filter by page
      if (filterPage !== 'all') {
        matches = matches && activity.page === filterPage;
      }
      
      // Filter by device type
      if (filterDevice !== 'all') {
        matches = matches && activity.device_type === filterDevice;
      }
      
      // Filter by country
      if (filterCountry !== 'all') {
        matches = matches && activity.country === filterCountry;
      }
      
      return matches;
    });
  }, [activities, filterType, filterPage, filterDevice, filterCountry]);

  // Get unique values for filter dropdowns
  const filterOptions = useMemo(() => {
    const eventTypes = new Set<string>();
    const pages = new Set<string>();
    const deviceTypes = new Set<string>();
    const countries = new Set<string>();
    
    activities.forEach(activity => {
      if (activity.event_type) eventTypes.add(activity.event_type);
      if (activity.page) pages.add(activity.page);
      if (activity.device_type) deviceTypes.add(activity.device_type);
      if (activity.country) countries.add(activity.country);
    });
    
    return {
      eventTypes: Array.from(eventTypes),
      pages: Array.from(pages),
      deviceTypes: Array.from(deviceTypes),
      countries: Array.from(countries),
    };
  }, [activities]);

  const { recordCustomEvent } = useActivity();
  
  const handleSpecialAction = () => {
    recordCustomEvent('special_action', { details: 'Custom event data' });
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
            <Activity className="w-6 h-6 mr-2 text-blue-500" />
            User Activity Dashboard
          </h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/admin')}
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg flex items-center border border-gray-700"
            >
              <Shield className="w-4 h-4 mr-2 text-blue-400" />
              Admin Home
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2 text-white" />
              Exit Dashboard
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        {/* Time range selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('24h')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                timeRange === '24h'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Last 24 Hours
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                timeRange === '7d'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                timeRange === '30d'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Last 30 Days
            </button>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={fetchActivityData} 
              className="flex items-center text-sm text-gray-400 hover:text-blue-400"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </button>
            <button 
              onClick={exportAsCSV} 
              className="flex items-center text-sm text-gray-400 hover:text-blue-400"
              disabled={activities.length === 0}
            >
              <Download className="w-4 h-4 mr-1" />
              Export CSV
            </button>
          </div>
        </div>
        
        {/* Metrics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <UserMetricsCard 
            icon={<Users className="w-5 h-5 text-blue-400" />}
            title="Unique Visitors"
            value={metrics.uniqueVisitors.toString()}
            bgColor="bg-gradient-to-br from-blue-900/40 to-blue-800/40"
          />
          <UserMetricsCard 
            icon={<Globe className="w-5 h-5 text-green-400" />}
            title="Total Sessions"
            value={metrics.totalSessions.toString()}
            bgColor="bg-gradient-to-br from-green-900/40 to-green-800/40"
          />
          <UserMetricsCard 
            icon={<Smartphone className="w-5 h-5 text-purple-400" />}
            title="Page Views"
            value={metrics.totalPageViews.toString()}
            bgColor="bg-gradient-to-br from-purple-900/40 to-purple-800/40"
          />
          <UserMetricsCard 
            icon={<Clock className="w-5 h-5 text-amber-400" />}
            title="Avg. Time on Site"
            value={`${Math.floor(metrics.avgTimeOnSite / 60)}m ${metrics.avgTimeOnSite % 60}s`}
            bgColor="bg-gradient-to-br from-amber-900/40 to-amber-800/40"
          />
        </div>
        
        {/* Dashboard content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Activity table and filters */}
          <div className="xl:col-span-2 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-medium text-white flex items-center">
                <MousePointer className="w-5 h-5 mr-2 text-blue-400" />
                User Activity Log
              </h2>
            </div>
            
            {/* Filters */}
            <ActivityFilter 
              filterOptions={filterOptions}
              filterType={filterType}
              setFilterType={setFilterType}
              filterPage={filterPage}
              setFilterPage={setFilterPage}
              filterDevice={filterDevice}
              setFilterDevice={setFilterDevice}
              filterCountry={filterCountry}
              setFilterCountry={setFilterCountry}
            />
            
            {/* Activity Table */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ActivityTable 
                activities={filteredActivities} 
                formatTimestamp={formatTimestamp}
              />
            )}
          </div>
          
          {/* Real-time alerts panel */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-medium text-white flex items-center">
                <Bell className="w-5 h-5 mr-2 text-amber-400" />
                Real-Time Alerts
              </h2>
            </div>
            
            <div className="p-4 max-h-[600px] overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  <p>No alerts yet. They will appear here in real-time.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.map(alert => (
                    <RealTimeAlert 
                      key={alert.id}
                      alert={alert}
                      formatTimestamp={formatTimestamp}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAdminPage; 