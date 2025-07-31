import React from 'react';
import { AlertCircle, FileText, Clock, User } from 'lucide-react';

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

interface RealTimeAlertProps {
  alert: Alert;
  formatTimestamp: (dateString: string) => string;
}

const RealTimeAlert: React.FC<RealTimeAlertProps> = ({
  alert,
  formatTimestamp
}) => {
  // Get alert type color
  const getAlertTypeColor = (type: string): string => {
    switch (type) {
      case 'form_submission':
        return 'bg-purple-900/50 text-purple-300 border-purple-700';
      case 'pricing_view':
        return 'bg-green-900/50 text-green-300 border-green-700';
      case 'contact_view':
        return 'bg-blue-900/50 text-blue-300 border-blue-700';
      case 'idle_user':
        return 'bg-amber-900/50 text-amber-300 border-amber-700';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  // Get alert icon
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'form_submission':
        return <FileText className="w-4 h-4 text-purple-400" />;
      case 'pricing_view':
      case 'contact_view':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'idle_user':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-3 bg-gray-850 border border-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className={`p-1 rounded-md mr-2 ${getAlertTypeColor(alert.type)}`}>
            {getAlertIcon(alert.type)}
          </span>
          <h4 className="text-sm font-medium text-white">{alert.message}</h4>
        </div>
        <span className="text-xs text-gray-400">{formatTimestamp(alert.timestamp)}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
        <div className="flex items-center text-gray-400">
          <User className="w-3 h-3 mr-1" />
          <span className="truncate" title={alert.data.session_id}>
            Session: {alert.data.session_id.substring(0, 8)}...
          </span>
        </div>
        <div className="text-gray-400">
          Page: <span className="text-gray-300">{alert.data.page}</span>
        </div>
        {alert.data.country && (
          <div className="text-gray-400">
            Location: <span className="text-gray-300">{alert.data.country}</span>
          </div>
        )}
        {alert.data.device_type && (
          <div className="text-gray-400">
            Device: <span className="text-gray-300">{alert.data.device_type}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeAlert; 