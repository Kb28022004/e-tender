import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenDisplay = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("jkjljdsjfdsafjdsjdfsljfdsljkdsjdkljdsajkljfdsljfdsafdsljfdsljfdsljfdsljfdsaf");
  
  const handleApproved = () => {
    console.log("Approved token");
    // In a real app, this would submit the token to the backend
    navigate("/authorization/verify-token");
  };

  const handleClose = () => {
    console.log("Closing token display");
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

      {/* Send Message Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Message</h2>
        <div className="mb-2">Generate Token</div>
        
        {/* Token Display */}
        <Card className="border border-gray-200 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="w-full">
              <textarea
                readOnly
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                value={token}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        <div className="flex space-x-4 justify-center">
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white px-6"
            onClick={handleApproved}
          >
            Approved
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

export default TokenDisplay;
