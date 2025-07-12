import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPI, type LoginRequest, type ApiError } from "@/services/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const credentials: LoginRequest = { email, password };
      const response = await authAPI.login(credentials);

      // Debug: Log the actual response
      console.log('Login response:', response);

      // Check multiple possible response structures
      if (response.success || response.data || response.token) {
        // Handle different response structures
        const token = response.data?.token || response.token;
        const user = response.data?.user || response.user || { email, name: 'Admin' };
        
        if (token) {
          // Store authentication data
          localStorage.setItem('authToken', token);
          localStorage.setItem('userData', JSON.stringify(user));
          
          console.log('Login successful, navigating to dashboard');
          // Navigate to dashboard
          navigate('/');
          return;
        }
      }
      
      // If we reach here, login failed
      setError(response.message || 'Login failed - Invalid credentials');
    } catch (err) {
      console.error('Login error:', err);
      const apiError = err as ApiError;
      setError(apiError.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
        <div className="max-w-md w-full relative">
          {/* Main illustration container */}
          <div className="relative">
            {/* White circular background */}
            <div className="w-80 h-80 bg-white rounded-full absolute -top-10 -left-10 shadow-lg"></div>
            
            {/* Tablet/Device */}
            <div className="relative z-10 bg-slate-800 rounded-2xl p-4 w-72 mx-auto shadow-xl transform rotate-12">
              <div className="bg-white rounded-xl p-6">
                <div className="text-center">
                  {/* Profile Icon */}
                  <div className="w-16 h-16 bg-slate-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-slate-400 rounded-full"></div>
                  </div>
                  
                  {/* Sign In Text */}
                  <div className="text-sm font-bold text-slate-800 mb-3">SIGN IN</div>
                  
                  {/* Form placeholder lines */}
                  <div className="space-y-2 mb-4">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="h-2 bg-slate-200 rounded w-4/5 mx-auto"></div>
                    <div className="h-2 bg-slate-200 rounded w-3/5 mx-auto"></div>
                  </div>
                  
                  {/* Login Button */}
                  <div className="bg-blue-600 text-white py-2 px-6 rounded-lg text-sm font-medium">
                    Login
                  </div>
                </div>
              </div>
            </div>
            
            {/* Person Figure */}
            <div className="absolute -right-12 bottom-0 z-20">
              <div className="relative">
                {/* Head */}
                <div className="w-12 h-12 bg-orange-400 rounded-full mx-auto mb-1"></div>
                
                {/* Body */}
                <div className="w-16 h-20 bg-blue-500 rounded-t-2xl mx-auto relative">
                  {/* White shirt */}
                  <div className="w-12 h-16 bg-white rounded-t-xl mx-auto absolute top-1 left-2"></div>
                </div>
                
                {/* Legs */}
                <div className="flex justify-center space-x-1">
                  <div className="w-3 h-12 bg-slate-600 rounded-b-lg"></div>
                  <div className="w-3 h-12 bg-slate-600 rounded-b-lg"></div>
                </div>
                
                {/* Shoes */}
                <div className="flex justify-center space-x-2 -mt-1">
                  <div className="w-4 h-3 bg-slate-800 rounded-lg"></div>
                  <div className="w-4 h-3 bg-slate-800 rounded-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Security Icons floating */}
            <div className="absolute -top-8 -left-4 z-10">
              <div className="bg-blue-100 p-3 rounded-xl shadow-lg transform rotate-12">
                <div className="w-6 h-8 border-2 border-blue-600 rounded-t-lg relative">
                  <div className="w-2 h-2 bg-blue-600 rounded-full absolute top-1 left-1"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 left-20 z-10">
              <div className="bg-slate-100 p-3 rounded-xl shadow-lg transform -rotate-12">
                <div className="w-6 h-6 border-2 border-slate-600 rounded"></div>
              </div>
            </div>
            
            <div className="absolute top-8 left-32 z-10">
              <div className="bg-orange-100 p-3 rounded-xl shadow-lg transform rotate-45">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
            </div>
            
            {/* Key on ground */}
            <div className="absolute bottom-8 left-8 z-10">
              <div className="w-8 h-12 transform rotate-45">
                <div className="w-3 h-8 bg-blue-400 rounded-t-full"></div>
                <div className="w-6 h-4 bg-blue-400 relative">
                  <div className="absolute right-0 top-1 w-2 h-1 bg-blue-400"></div>
                  <div className="absolute right-0 top-3 w-1 h-1 bg-blue-400"></div>
                </div>
              </div>
            </div>
            
            {/* Plant */}
            <div className="absolute bottom-0 -left-8 z-10">
              <div className="w-6 h-8 bg-slate-700 rounded-b-lg"></div>
              <div className="w-8 h-12 bg-green-500 rounded-t-full -mt-2 ml-1 relative">
                <div className="absolute top-2 left-1 w-6 h-8 bg-green-600 rounded-t-full"></div>
                <div className="absolute top-4 right-1 w-4 h-6 bg-green-400 rounded-t-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-gray-600 text-lg mb-2">
                Welcome back! <span className="text-2xl">👋</span>
              </h1>
              <h2 className="text-3xl font-bold text-gray-900">
                Login to your account
              </h2>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Please enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="mr-2" />
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-medium text-lg transition-colors mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </Button>

            {/* Forget Password Link */}
            <div className="text-right mt-4">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
              >
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 