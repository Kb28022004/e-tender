import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle password creation logic here
    console.log("New password created:", newPassword);
    // Navigate back to login page or show success message
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
        <div className="max-w-md w-full relative">
          {/* Background security icons */}
          <div className="absolute top-4 left-8">
            <div className="w-16 h-12 bg-white rounded-lg shadow-lg p-3 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="absolute top-8 right-4">
            <div className="w-14 h-10 bg-blue-600 rounded-lg shadow-lg p-2 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main scene */}
          <div className="relative z-10">
            {/* Central person figure */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Head */}
                <div className="w-12 h-12 bg-orange-300 rounded-full mx-auto mb-2 relative">
                  {/* Hair */}
                  <div className="absolute -top-1 -left-1 w-14 h-8 bg-slate-800 rounded-full"></div>
                  <div className="absolute top-4 left-3 w-6 h-6 bg-orange-300 rounded-full"></div>
                </div>
                
                {/* Body */}
                <div className="w-16 h-20 bg-blue-300 rounded-t-2xl mx-auto relative">
                  {/* Shirt details */}
                  <div className="w-12 h-16 bg-blue-400 rounded-t-xl mx-auto mt-1"></div>
                </div>
                
                {/* Arms */}
                <div className="absolute top-14 -left-4 w-6 h-3 bg-orange-300 rounded-full transform -rotate-12"></div>
                <div className="absolute top-12 -right-4 w-6 h-3 bg-orange-300 rounded-full transform rotate-45"></div>
                
                {/* Legs */}
                <div className="flex justify-center space-x-1 mt-1">
                  <div className="w-3 h-16 bg-slate-700 rounded-b-lg"></div>
                  <div className="w-3 h-16 bg-slate-700 rounded-b-lg"></div>
                </div>
                
                {/* Shoes */}
                <div className="flex justify-center space-x-2 -mt-1">
                  <div className="w-4 h-3 bg-slate-800 rounded-lg"></div>
                  <div className="w-4 h-3 bg-slate-800 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Security icons around the person */}
            {/* Main password dialog - top right */}
            <div className="absolute -top-4 right-8 bg-blue-600 rounded-xl shadow-xl p-4 w-32">
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-5 border-2 border-blue-600 rounded-t-lg relative">
                    <div className="w-2 h-2 bg-blue-600 rounded-full absolute top-0.5 left-0.5"></div>
                    <div className="w-5 h-3 bg-blue-600 rounded-b-lg -mt-0.5 -ml-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="text-center text-white text-xs mb-2">* * * * *</div>
            </div>

            {/* Shield icon - top left */}
            <div className="absolute top-12 left-4 bg-blue-100 rounded-xl shadow-lg p-3 transform -rotate-12">
              <div className="w-6 h-8 bg-blue-600 rounded-t-full relative">
                <div className="absolute top-2 left-2 w-2 h-2 bg-blue-100 rounded-full"></div>
                <div className="w-6 h-2 bg-blue-600 rounded-b-lg -mt-1"></div>
              </div>
            </div>

            {/* Fingerprint icon - left side */}
            <div className="absolute top-32 left-0 bg-blue-100 rounded-xl shadow-lg p-3 transform rotate-12">
              <div className="w-6 h-6 relative">
                <div className="w-6 h-6 border-2 border-blue-600 rounded-full"></div>
                <div className="absolute top-1 left-1 w-4 h-4 border border-blue-600 rounded-full"></div>
                <div className="absolute top-2 left-2 w-2 h-2 border border-blue-600 rounded-full"></div>
              </div>
            </div>

            {/* Computer/monitor icon - right side */}
            <div className="absolute top-40 right-4 bg-slate-100 rounded-xl shadow-lg p-3 transform -rotate-12">
              <div className="w-8 h-6 bg-slate-600 rounded-lg relative">
                <div className="w-6 h-4 bg-blue-400 rounded-sm m-1"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-600 rounded-b-lg"></div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-slate-600 rounded-lg"></div>
              </div>
            </div>

            {/* Plant at bottom */}
            <div className="absolute bottom-8 left-8">
              <div className="w-6 h-8 bg-slate-700 rounded-b-lg"></div>
              <div className="w-8 h-12 bg-blue-600 rounded-t-full -mt-2 ml-1 relative">
                <div className="absolute top-2 left-1 w-6 h-8 bg-blue-700 rounded-t-full"></div>
                <div className="absolute top-4 right-1 w-4 h-6 bg-blue-500 rounded-t-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Create New Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create New Password
              </h1>
              <p className="text-gray-600 text-lg">
                Enter New Password
              </p>
            </div>

            {/* New Password Field */}
            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Shahrukh@890"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Shahrukh@890"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Create New Password Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-medium text-lg transition-colors mt-6"
            >
              Create New Password
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

export default CreateNewPassword; 