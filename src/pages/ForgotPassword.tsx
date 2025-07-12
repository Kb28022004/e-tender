import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Reset password for:", email);
    // Navigate to OTP verification page
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
        <div className="max-w-md w-full relative">
          {/* Background elements */}
          <div className="absolute top-8 left-8">
            <div className="w-16 h-12 bg-white rounded-lg shadow-lg p-2">
              <div className="w-full h-2 bg-gray-300 rounded mb-1"></div>
              <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          <div className="absolute top-16 right-4">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-blue-600 rounded-full relative">
                <div className="absolute top-1 left-1 w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main scene */}
          <div className="relative z-10">
            {/* Chair */}
            <div className="w-64 h-48 bg-blue-600 rounded-2xl relative mx-auto">
              {/* Chair back */}
              <div className="w-full h-32 bg-blue-700 rounded-t-2xl"></div>
              {/* Chair seat */}
              <div className="w-full h-16 bg-blue-600 absolute bottom-0"></div>
              {/* Chair legs */}
              <div className="absolute -bottom-8 left-4 w-3 h-8 bg-slate-800 transform -rotate-12"></div>
              <div className="absolute -bottom-8 right-4 w-3 h-8 bg-slate-800 transform rotate-12"></div>
              <div className="absolute -bottom-6 left-8 w-3 h-6 bg-slate-800"></div>
              <div className="absolute -bottom-6 right-8 w-3 h-6 bg-slate-800"></div>
            </div>

            {/* Person sitting in chair */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              {/* Head */}
              <div className="w-12 h-12 bg-orange-300 rounded-full mx-auto mb-2 relative">
                {/* Hair */}
                <div className="absolute -top-1 -left-1 w-14 h-8 bg-slate-800 rounded-full"></div>
                <div className="absolute top-4 left-3 w-6 h-6 bg-orange-300 rounded-full"></div>
              </div>
              
              {/* Body */}
              <div className="w-14 h-16 bg-white rounded-t-xl mx-auto relative">
                {/* Stripes on shirt */}
                <div className="absolute top-2 left-0 w-full h-1 bg-blue-200"></div>
                <div className="absolute top-5 left-0 w-full h-1 bg-blue-200"></div>
                <div className="absolute top-8 left-0 w-full h-1 bg-blue-200"></div>
              </div>
              
              {/* Arms */}
              <div className="absolute top-14 -left-3 w-6 h-3 bg-orange-300 rounded-full transform -rotate-45"></div>
              <div className="absolute top-12 -right-2 w-6 h-3 bg-orange-300 rounded-full transform rotate-12"></div>
              
              {/* Laptop */}
              <div className="absolute top-20 left-1 w-12 h-8 bg-slate-800 rounded transform rotate-12">
                <div className="w-10 h-6 bg-slate-300 rounded-sm m-1"></div>
              </div>
              
              {/* Legs */}
              <div className="absolute top-24 left-2 w-10 h-8 bg-slate-800 rounded-b-lg"></div>
              
              {/* Feet */}
              <div className="absolute top-32 left-1 w-4 h-3 bg-green-600 rounded-lg"></div>
              <div className="absolute top-32 right-1 w-4 h-3 bg-green-600 rounded-lg"></div>
            </div>

            {/* Floating dialog box */}
            <div className="absolute -top-8 right-8 bg-white rounded-xl shadow-xl p-4 w-40">
              {/* Window controls */}
              <div className="flex space-x-1 mb-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              
              {/* Key icon */}
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-8 relative">
                    {/* Key head */}
                    <div className="w-4 h-4 border-2 border-blue-600 rounded-full"></div>
                    {/* Key shaft */}
                    <div className="w-1 h-4 bg-blue-600 mx-auto"></div>
                    {/* Key teeth */}
                    <div className="absolute bottom-1 right-0 w-2 h-1 bg-blue-600"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-blue-600"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-xs font-medium text-gray-700 mb-2">
                Forgot password?
              </div>
              
              {/* Form elements */}
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                  Reset Password
                </div>
              </div>
            </div>

            {/* Plant */}
            <div className="absolute bottom-4 right-12">
              <div className="w-4 h-6 bg-slate-700 rounded-b-lg"></div>
              <div className="w-6 h-8 bg-green-500 rounded-t-full -mt-1 ml-1 relative">
                <div className="absolute top-1 left-1 w-4 h-6 bg-green-600 rounded-t-full"></div>
                <div className="absolute top-2 right-0 w-3 h-4 bg-green-400 rounded-t-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600 text-lg">
                Enter your email to reset it?
              </p>
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

            {/* Next Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-medium text-lg transition-colors mt-6"
            >
              Next
            </Button>

            {/* Return to Login Link */}
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to the Login Page
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 