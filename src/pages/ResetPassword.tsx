import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    
    try {
      setLoading(true);
      setMessage(null);
      
      // Reset password using Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password',
      });
      
      if (error) throw error;
      
      setMessage({
        type: 'success',
        text: 'Password reset instructions have been sent to your email'
      });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred while resetting your password'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Reset your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div className={`mb-4 p-3 rounded ${
              message.type === 'success' ? 'bg-green-800/30 text-green-400' : 'bg-red-800/30 text-red-400'
            }`}>
              {message.text}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/signin" className="text-sm text-blue-400 hover:text-blue-300">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 