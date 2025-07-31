import React from 'react';
import { Filter } from 'lucide-react';

interface FilterOptionsType {
  eventTypes: string[];
  pages: string[];
  deviceTypes: string[];
  countries: string[];
}

interface ActivityFilterProps {
  filterOptions: FilterOptionsType;
  filterType: string;
  setFilterType: (value: string) => void;
  filterPage: string;
  setFilterPage: (value: string) => void;
  filterDevice: string;
  setFilterDevice: (value: string) => void;
  filterCountry: string;
  setFilterCountry: (value: string) => void;
}

const ActivityFilter: React.FC<ActivityFilterProps> = ({
  filterOptions,
  filterType,
  setFilterType,
  filterPage,
  setFilterPage,
  filterDevice,
  setFilterDevice,
  filterCountry,
  setFilterCountry,
}) => {
  return (
    <div className="p-4 bg-gray-850 border-b border-gray-700">
      <div className="flex items-center mb-3">
        <Filter className="w-4 h-4 mr-2 text-blue-400" />
        <h3 className="text-sm font-medium text-gray-300">Filter Activity</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Event Type Filter */}
        <div>
          <label htmlFor="filter-event-type" className="block text-xs font-medium text-gray-400 mb-1">
            Event Type
          </label>
          <select
            id="filter-event-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="block w-full bg-gray-900 border border-gray-700 rounded-md py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Event Types</option>
            {filterOptions.eventTypes.map((type) => (
              <option key={type} value={type}>
                {type
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </option>
            ))}
          </select>
        </div>
        
        {/* Page Filter */}
        <div>
          <label htmlFor="filter-page" className="block text-xs font-medium text-gray-400 mb-1">
            Page
          </label>
          <select
            id="filter-page"
            value={filterPage}
            onChange={(e) => setFilterPage(e.target.value)}
            className="block w-full bg-gray-900 border border-gray-700 rounded-md py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Pages</option>
            {filterOptions.pages.map((page) => (
              <option key={page} value={page}>
                {page || '/'}
              </option>
            ))}
          </select>
        </div>
        
        {/* Device Type Filter */}
        <div>
          <label htmlFor="filter-device" className="block text-xs font-medium text-gray-400 mb-1">
            Device Type
          </label>
          <select
            id="filter-device"
            value={filterDevice}
            onChange={(e) => setFilterDevice(e.target.value)}
            className="block w-full bg-gray-900 border border-gray-700 rounded-md py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Devices</option>
            {filterOptions.deviceTypes.map((device) => (
              <option key={device} value={device}>
                {device.charAt(0).toUpperCase() + device.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Country Filter */}
        <div>
          <label htmlFor="filter-country" className="block text-xs font-medium text-gray-400 mb-1">
            Country
          </label>
          <select
            id="filter-country"
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="block w-full bg-gray-900 border border-gray-700 rounded-md py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Countries</option>
            {filterOptions.countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilter; 