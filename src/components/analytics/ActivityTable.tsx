import React from 'react';
import { Globe, Clock, Smartphone, User } from 'lucide-react';

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

interface ActivityTableProps {
  activities: UserActivity[];
  formatTimestamp: (dateString: string) => string;
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activities, formatTimestamp }) => {
  // Get event type badge color
  const getEventTypeColor = (eventType: string): string => {
    switch (eventType) {
      case 'page_visit':
        return 'bg-blue-900/50 text-blue-300 border-blue-700';
      case 'click':
      case 'button_click':
      case 'link_click':
        return 'bg-green-900/50 text-green-300 border-green-700';
      case 'form_submission':
        return 'bg-purple-900/50 text-purple-300 border-purple-700';
      case 'scroll':
        return 'bg-gray-800 text-gray-300 border-gray-700';
      case 'mouse_move':
        return 'bg-gray-800 text-gray-300 border-gray-700';
      case 'user_idle':
        return 'bg-amber-900/50 text-amber-300 border-amber-700';
      case 'user_active':
        return 'bg-emerald-900/50 text-emerald-300 border-emerald-700';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  // Format event type for display
  const formatEventType = (eventType: string): string => {
    return eventType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  if (activities.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        <p>No activity data found for the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Page</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User Info</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Device</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {activities.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-750">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEventTypeColor(
                      activity.event_type
                    )}`}
                  >
                    {formatEventType(activity.event_type)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-white">
                  {activity.page || '/'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <User className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="truncate max-w-[120px]" title={activity.session_id}>
                    {activity.session_id.substring(0, 8)}...
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <Globe className="w-4 h-4 mr-1 text-gray-400" />
                  <span>
                    {activity.country ? `${activity.country}${activity.city ? `, ${activity.city}` : ''}` : 'Unknown'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <Smartphone className="w-4 h-4 mr-1 text-gray-400" />
                  <span>
                    {activity.device_type ? (
                      <>
                        {activity.device_type}
                        {activity.browser ? ` / ${activity.browser}` : ''}
                      </>
                    ) : (
                      'Unknown'
                    )}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" />
                  <span>{formatTimestamp(activity.timestamp)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable; 