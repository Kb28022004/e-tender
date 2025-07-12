import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log("Verify OTP:", otp);
    // Navigate to create new password page
    navigate("/create-new-password");
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

          {/* Main scene */}
          <div className="relative z-10">
            {/* Computer Monitor */}
            <div className="w-80 h-56 bg-gray-600 rounded-xl relative mx-auto shadow-2xl">
              {/* Monitor stand */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gray-700 rounded-b-lg"></div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-lg"></div>
              
              {/* Screen */}
              <div className="w-full h-full bg-blue-600 rounded-xl p-6 relative overflow-hidden">
                {/* OTP Dialog bubble */}
                <div className="absolute -top-8 right-4 bg-white rounded-xl shadow-xl p-3 transform rotate-12">
                  <div className="text-xs text-gray-600 text-center">Your OTP Code</div>
                  <div className="text-lg font-bold text-blue-600 text-center">90210</div>
                  <div className="absolute bottom-2 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white transform rotate-45"></div>
                </div>
                
                {/* Lock icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-10 border-3 border-white rounded-t-lg relative">
                      <div className="absolute top-2 left-1 w-6 h-6 bg-white rounded-full"></div>
                      <div className="w-10 h-6 bg-white rounded-b-lg -mt-1"></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-white mb-4">
                  <div className="text-sm">Enter your OTP</div>
                </div>
                
                {/* OTP Input boxes */}
                <div className="flex justify-center space-x-2 mb-6">
                  <div className="w-10 h-12 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">9</span>
                  </div>
                  <div className="w-10 h-12 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">0</span>
                  </div>
                  <div className="w-10 h-12 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">2</span>
                  </div>
                  <div className="w-10 h-12 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">1</span>
                  </div>
                  <div className="w-10 h-12 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">0</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-blue-200 mb-3">Send Again</div>
                  <button className="bg-blue-400 hover:bg-blue-300 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                    CONTINUE
                  </button>
                </div>
              </div>
            </div>

            {/* Woman with phone */}
            <div className="absolute -right-12 bottom-8 z-20">
              <div className="relative">
                {/* Head */}
                <div className="w-10 h-10 bg-orange-300 rounded-full mx-auto mb-1 relative">
                  {/* Hair */}
                  <div className="absolute -top-1 -left-1 w-12 h-6 bg-slate-800 rounded-full"></div>
                  <div className="absolute top-3 left-2 w-6 h-6 bg-orange-300 rounded-full"></div>
                </div>
                
                {/* Body */}
                <div className="w-12 h-16 bg-white rounded-t-xl mx-auto relative">
                  {/* Red/pink dress/top */}
                  <div className="w-10 h-12 bg-red-400 rounded-t-lg mx-auto mt-1"></div>
                </div>
                
                {/* Arms */}
                <div className="absolute top-12 -right-2 w-5 h-3 bg-orange-300 rounded-full transform rotate-45"></div>
                <div className="absolute top-14 -left-2 w-5 h-3 bg-orange-300 rounded-full transform -rotate-12"></div>
                
                {/* Phone in hand */}
                <div className="absolute top-10 -right-4 w-3 h-5 bg-slate-800 rounded transform rotate-12">
                  <div className="w-2 h-4 bg-blue-400 rounded-sm m-0.5"></div>
                </div>
                
                {/* Legs */}
                <div className="absolute top-20 left-1 w-10 h-8 bg-slate-800 rounded-b-lg"></div>
                
                {/* Feet */}
                <div className="absolute top-28 left-0 w-4 h-3 bg-red-600 rounded-lg"></div>
                <div className="absolute top-28 right-0 w-4 h-3 bg-red-600 rounded-lg"></div>
              </div>
            </div>

            {/* Plant */}
            <div className="absolute bottom-4 right-4">
              <div className="w-4 h-6 bg-slate-700 rounded-b-lg"></div>
              <div className="w-6 h-8 bg-blue-600 rounded-t-full -mt-1 ml-1 relative">
                <div className="absolute top-1 left-1 w-4 h-6 bg-blue-700 rounded-t-full"></div>
                <div className="absolute top-2 right-0 w-3 h-4 bg-blue-500 rounded-t-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - OTP Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600 text-lg">
                We have sent a verification code to your mobile number
              </p>
            </div>

            {/* OTP Field */}
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="*****"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest"
                maxLength={5}
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

export default VerifyOTP; 