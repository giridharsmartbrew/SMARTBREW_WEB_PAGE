import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useActivityTracker } from '../hooks/useActivityTracker';
import { useAuth } from './AuthContext';

// Define types for our context
type ActivityContextType = {
  currentPage: string;
  isIdle: boolean;
  recordCustomEvent: (eventType: string, metadata?: Record<string, any>) => void;
};

// Create context with default values
const ActivityContext = createContext<ActivityContextType>({
  currentPage: '/',
  isIdle: false,
  recordCustomEvent: () => {},
});

// Context provider component
export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>(location.pathname);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  
  // Initialize activity tracker hook - track all visitors, authenticated or not
  const { recordEvent, startTracking, stopTracking } = useActivityTracker({
    // Pass user ID if available, but tracking works even without it
    userId: user?.id,
    supabase,
    // Ensure tracking starts immediately, regardless of auth state
    startImmediately: true
  });

  // Record custom events
  const recordCustomEvent = (eventType: string, metadata?: Record<string, any>) => {
    recordEvent(eventType, metadata);
  };

  // Update current page when route changes
  useEffect(() => {
    const path = location.pathname;
    setCurrentPage(path);
    
    // Record page visit with additional metadata if user is authenticated
    recordEvent('page_visit', { 
      path,
      authenticated: !!user,
      // Include user email only for admin pages
      ...(path.includes('admin') && user?.email ? { userEmail: user.email } : {})
    });
    
    // Reset idle state on page change
    setIsIdle(false);
  }, [location.pathname, recordEvent, user]);

  // Start tracking when component mounts
  useEffect(() => {
    startTracking();
    
    // Cleanup when unmounting
    return () => {
      stopTracking();
    };
  }, [startTracking, stopTracking]);

  // Set up idle detection
  useEffect(() => {
    const idleTime = 30000; // 30 seconds
    let idleTimer: number;
    
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      
      if (isIdle) {
        setIsIdle(false);
        recordEvent('user_active');
      }
      
      idleTimer = window.setTimeout(() => {
        setIsIdle(true);
        recordEvent('user_idle');
      }, idleTime);
    };
    
    // Events that reset the idle timer
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer);
    });
    
    // Initial setup
    resetIdleTimer();
    
    // Cleanup
    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [isIdle, recordEvent]);

  const contextValue: ActivityContextType = {
    currentPage,
    isIdle,
    recordCustomEvent,
  };

  return (
    <ActivityContext.Provider value={contextValue}>
      {children}
    </ActivityContext.Provider>
  );
};

// Custom hook to use the activity context
export const useActivity = () => useContext(ActivityContext); 