import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Check if user is authenticated after OAuth redirect
    if (user) {
      // Look for any stored redirect target
      const redirectTarget = sessionStorage.getItem('authRedirectTarget');
      if (redirectTarget) {
        // Clear the stored value
        sessionStorage.removeItem('authRedirectTarget');
        // Navigate to the stored path
        navigate(redirectTarget);
      } else {
        // Default redirect to home page
        navigate('/');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl text-white font-medium">Authenticating...</h2>
        <p className="text-gray-400 mt-2">Please wait while we complete your sign-in</p>
      </div>
    </div>
  );
};

export default AuthCallback; 