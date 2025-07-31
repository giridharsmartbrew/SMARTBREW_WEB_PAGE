import { useCallback, useEffect, useRef, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { throttle, debounce } from '../utils/performance';
import { getLocationData, getDeviceInfo } from '../utils/trackingHelpers';

interface ActivityTrackerOptions {
  userId?: string; 
  supabase: SupabaseClient;
  throttleDelay?: number;
  scrollThrottleDelay?: number;
  mouseThrottleDelay?: number;
  batchSize?: number;
  batchInterval?: number;
  startImmediately?: boolean;
}

interface ActivityEvent {
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

export const useActivityTracker = ({
  userId,
  supabase,
  throttleDelay = 1000,
  scrollThrottleDelay = 1000,
  mouseThrottleDelay = 2000,
  batchSize = 10,
  batchInterval = 5000,
  startImmediately = false,
}: ActivityTrackerOptions) => {
  const [sessionId] = useState<string>(() => {
    // Get or create a session ID from localStorage
    const existingSessionId = localStorage.getItem('smartbrew_session_id');
    if (existingSessionId) return existingSessionId;
    
    const newSessionId = crypto.randomUUID();
    localStorage.setItem('smartbrew_session_id', newSessionId);
    return newSessionId;
  });
  
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<string>(window.location.pathname);
  
  const eventQueueRef = useRef<ActivityEvent[]>([]);
  const timerRef = useRef<number | null>(null);
  const trackingEnabledRef = useRef<boolean>(false);
  const maxScrollDepthRef = useRef<number>(0);
  
  // Fetch device info on initialization
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const info = await getDeviceInfo();
      setDeviceInfo(info);
    };
    
    fetchDeviceInfo();
  }, []);
  
  // Fetch location data on first visit only
  useEffect(() => {
    const hasLocationInfo = localStorage.getItem('smartbrew_location_info');
    
    if (!hasLocationInfo) {
      const fetchLocationData = async () => {
        try {
          const locationData = await getLocationData();
          setLocationInfo(locationData);
          
          // Store a flag so we don't fetch on every visit
          localStorage.setItem('smartbrew_location_info', 'true');
          // Store actual data for use in future sessions
          localStorage.setItem('smartbrew_location_data', JSON.stringify(locationData));
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      };
      
      fetchLocationData();
    } else {
      // Use cached location data
      const cachedData = localStorage.getItem('smartbrew_location_data');
      if (cachedData) {
        setLocationInfo(JSON.parse(cachedData));
      }
    }
  }, []);
  
  // Add an event to the queue
  const queueEvent = useCallback((eventType: string, metadata?: Record<string, any>) => {
    if (!trackingEnabledRef.current) return;
    
    const event: ActivityEvent = {
      session_id: sessionId,
      page: currentPage,
      event_type: eventType,
      timestamp: new Date().toISOString(),
      ip_address: locationInfo?.ip,
      country: locationInfo?.country,
      region: locationInfo?.region,
      city: locationInfo?.city,
      device_type: deviceInfo?.deviceType,
      device_model: deviceInfo?.deviceModel,
      os: deviceInfo?.os,
      browser: deviceInfo?.browser,
      user_id: userId,
      metadata,
    };
    
    // Add scroll depth for relevant events
    if (['scroll', 'page_visit', 'user_active'].includes(eventType)) {
      event.scroll_depth = maxScrollDepthRef.current;
    }
    
    // Add mouse activity for relevant events
    if (['mouse_move', 'click', 'user_active'].includes(eventType)) {
      event.mouse_activity = true;
    }
    
    eventQueueRef.current.push(event);
    
    // If we've reached the batch size, flush immediately
    if (eventQueueRef.current.length >= batchSize) {
      flushEvents();
    } else if (timerRef.current === null) {
      // Otherwise set a timer to flush after the interval
      timerRef.current = window.setTimeout(flushEvents, batchInterval);
    }
  }, [sessionId, currentPage, deviceInfo, locationInfo, userId, batchSize, batchInterval]);
  
  // Flush events to Supabase
  const flushEvents = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (eventQueueRef.current.length === 0) return;
    
    const eventsToSend = [...eventQueueRef.current];
    eventQueueRef.current = [];
    
    try {
      const { error } = await supabase
        .from('user_activity')
        .insert(eventsToSend);
        
      if (error) {
        console.error('Error recording activity:', error);
        // Put events back in the queue if there was an error
        eventQueueRef.current = [...eventsToSend, ...eventQueueRef.current];
      }
    } catch (error) {
      console.error('Error sending activity data:', error);
      // Put events back in the queue
      eventQueueRef.current = [...eventsToSend, ...eventQueueRef.current];
    }
  }, [supabase]);
  
  // Main function to record an event
  const recordEvent = useCallback((eventType: string, metadata?: Record<string, any>) => {
    queueEvent(eventType, metadata);
  }, [queueEvent]);
  
  // Throttled event handlers
  const handleScroll = useCallback(throttle(() => {
    if (!trackingEnabledRef.current) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // Calculate scroll depth percentage (0-100)
    const scrollDepth = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
    
    // Update max scroll depth
    if (scrollDepth > maxScrollDepthRef.current) {
      maxScrollDepthRef.current = scrollDepth;
    }
    
    queueEvent('scroll', { scrollDepth });
  }, scrollThrottleDelay), [queueEvent, scrollThrottleDelay]);
  
  const handleMouseMove = useCallback(throttle(() => {
    if (!trackingEnabledRef.current) return;
    queueEvent('mouse_move');
  }, mouseThrottleDelay), [queueEvent, mouseThrottleDelay]);
  
  const handleClick = useCallback((e: MouseEvent) => {
    if (!trackingEnabledRef.current) return;
    
    // Check if the click was on a button or link
    const target = e.target as HTMLElement;
    const button = target.closest('button');
    const link = target.closest('a');
    
    if (button) {
      const buttonId = button.id || '';
      const buttonText = button.textContent?.trim() || '';
      const buttonClasses = button.className || '';
      
      queueEvent('button_click', { buttonId, buttonText, buttonClasses });
    } else if (link) {
      const href = link.getAttribute('href') || '';
      const linkText = link.textContent?.trim() || '';
      const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
      
      queueEvent('link_click', { href, linkText, isExternal });
    } else {
      // Generic click not on a button or link
      queueEvent('click', {
        x: e.clientX,
        y: e.clientY,
        target: target.tagName.toLowerCase(),
      });
    }
  }, [queueEvent]);
  
  // Form submission tracking
  const handleFormSubmit = useCallback((e: Event) => {
    if (!trackingEnabledRef.current) return;
    
    const form = e.target as HTMLFormElement;
    const formId = form.id || '';
    const formAction = form.action || '';
    const formMethod = form.method || '';
    
    queueEvent('form_submission', { formId, formAction, formMethod });
  }, [queueEvent]);
  
  // Handle page visibility changes
  const handleVisibilityChange = useCallback(() => {
    if (!trackingEnabledRef.current) return;
    
    if (document.visibilityState === 'hidden') {
      queueEvent('page_hide');
      flushEvents(); // Make sure to flush events when page is hidden
    } else {
      queueEvent('page_show');
    }
  }, [queueEvent, flushEvents]);
  
  // Setup tracking when enabled
  const startTracking = useCallback(() => {
    if (trackingEnabledRef.current) return;
    
    trackingEnabledRef.current = true;
    
    // Record initial page visit
    queueEvent('page_visit');
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick, true);
    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', handleFormSubmit);
    });
    
    // Update current page
    setCurrentPage(window.location.pathname);
    
    return () => {
      stopTracking();
    };
  }, [
    queueEvent, 
    handleScroll, 
    handleMouseMove, 
    handleClick, 
    handleVisibilityChange, 
    handleFormSubmit
  ]);
  
  // Start immediately if option is set
  useEffect(() => {
    if (startImmediately) {
      startTracking();
    }
  }, [startImmediately, startTracking]);
  
  // Stop tracking and clean up
  const stopTracking = useCallback(() => {
    if (!trackingEnabledRef.current) return;
    
    // Flush any remaining events
    flushEvents();
    
    // Remove event listeners
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('click', handleClick, true);
    window.removeEventListener('visibilitychange', handleVisibilityChange);
    
    // Remove form listeners
    document.querySelectorAll('form').forEach(form => {
      form.removeEventListener('submit', handleFormSubmit);
    });
    
    trackingEnabledRef.current = false;
  }, [
    flushEvents, 
    handleScroll, 
    handleMouseMove, 
    handleClick, 
    handleVisibilityChange, 
    handleFormSubmit
  ]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopTracking();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [stopTracking]);
  
  return {
    recordEvent,
    startTracking,
    stopTracking,
    sessionId,
    flushEvents
  };
}; 