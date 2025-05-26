import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Parse redirect parameter from URL query
  const searchParams = new URLSearchParams(location.search);
  const redirectPage = searchParams.get('redirect');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (redirectPage) {
        switch (redirectPage) {
          case 'contact':
            navigate('/contact');
            break;
          case 'blog':
            navigate('/blog');
            break;
          case 'careers':
            navigate('/careers');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  }, [user, navigate, redirectPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      
      // The redirect will be handled by the useEffect hook
    } catch (err) {
      setError('Invalid login credentials');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      // Redirect is handled by Supabase OAuth
    } catch (err) {
      setError('Error connecting to Google');
      console.error('Google login error:', err);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-20 px-3 sm:px-4 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 p-4 sm:p-6 md:p-8"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm sm:text-base">Sign in to access your account</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center"
            >
              <AlertCircle className="text-red-500 mr-3" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-8 sm:pl-10 pr-3 py-2.5 sm:py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-8 sm:pl-10 pr-3 py-2.5 sm:py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-xs sm:text-sm text-gray-400">Show Password</span>
                </label>
                <Link to="/reset-password" className="text-xs sm:text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
            
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-700"></div>
              <span className="mx-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-700"></div>
            </div>
            
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || googleLoading}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center
                ${googleLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
            >
              {googleLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-gray-900">Continue with Google</span>
                </>
              )}
            </button>
            
            {redirectPage === 'admin' && (
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-300 mb-2">Administrator login</p>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('himanshu@smartbrew.in');
                    setPassword('Himanshu@2025');
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Fill admin credentials
                </button>
              </div>
            )}
          </form>
          
          <div className="mt-6 sm:mt-8 text-center border-t border-gray-700 pt-4 sm:pt-6">
            <p className="text-gray-400 text-xs sm:text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage; 