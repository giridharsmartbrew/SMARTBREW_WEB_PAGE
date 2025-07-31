import React from 'react';

interface UserMetricsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
  subtitle?: string;
}

const UserMetricsCard: React.FC<UserMetricsCardProps> = ({
  icon,
  title,
  value,
  bgColor,
  subtitle
}) => {
  return (
    <div className={`rounded-lg border border-gray-700 ${bgColor} p-4`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <div className="bg-gray-800/50 p-1.5 rounded-md">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
};

export default UserMetricsCard; 