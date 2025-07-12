import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VerifyToken = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("jkjljdsjfdsafjdsjdfsljfdsljkdsjdkljdsajkljfdsljfdsafdsljfdsljfdsljfdsljfdsaf");
  
  const handleUpload = () => {
    console.log("Uploading token verification");
    // In a real app, this would submit the token to the backend
    navigate("/authorization");
  };

  const handleClose = () => {
    console.log("Closing verification");
    navigate("/authorization");
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Authorization</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="hover:text-admin-blue-600 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-admin-blue-600 cursor-pointer">Authorization</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Generate Token</span>
        </div>
      </div>

      {/* Verify Token Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Verify Token</h2>
        
        {/* Certificate Display */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-serif text-center text-gray-800 mb-8">My Certificate</h3>
            
            <div className="flex flex-col items-center space-y-2 text-center">
              <p className="text-lg font-medium">Shahrukh Khan Chaudhary</p>
              <p className="text-sm text-gray-600">CERT2025000001234515AKSJFDJFDFDED0D</p>
              <p className="text-sm text-gray-600">CERT1234515AKSJFDJFDFDED0D</p>
              <p className="text-sm text-gray-600 mt-2">shahrukhkhan9745@gmail.com</p>
            </div>
          </div>
          
          {/* Background wave effect */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://via.placeholder.com/1000x400/e6f7ff/e6f7ff?text=" 
              alt="Background wave" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Token Input */}
        <div className="mb-6">
          <p className="mb-2">Please Enter Token</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-4 justify-center">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            onClick={handleUpload}
          >
            Upload
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-300 text-gray-700 px-6"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyToken;
