import { ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AuthorizationContent = () => {
  const navigate = useNavigate();
  // Mock data for the authorization details
  const authorizationData = {
    tenderName: "Road Construction",
    contactInfo: "+91 8712 4545 80",
    departmentName: "General Manager",
    earnMoneyDeposit: "15",
    gst: "0000",
    poNumber: "25124548755",
    tenderFee: "15",
    tenderWinnerName: "Shahrukh",
    tenderWinnerStatus: "Pending",
    totalRefundableAmount: "15"
  };

  const handleDownloadDetails = () => {
    console.log("Downloading details...");
    // In a real app, this would trigger a download of the details
  };

  const handleApprove = () => {
    console.log("Approved!");
    // In a real app, this would update the status in the backend
    navigate("/authorization/generate-token");
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
          <span className="text-gray-900">Authorization</span>
        </div>
      </div>

      {/* Tender Name */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{authorizationData.tenderName}</h2>
      </div>

      {/* Authorization Details Card */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          {/* Download Details Button */}
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-blue-600 border-blue-600"
              onClick={handleDownloadDetails}
            >
              <Download className="w-4 h-4" />
              Download Details
            </Button>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex">
                  <div className="w-40 text-gray-600">Contact Information</div>
                  <div className="text-gray-800 font-medium">: {authorizationData.contactInfo}</div>
                </div>
                
                <div className="flex">
                  <div className="w-40 text-gray-600">Department Name</div>
                  <div className="text-gray-800 font-medium">: {authorizationData.departmentName}</div>
                </div>
                
                <div className="flex">
                  <div className="w-40 text-gray-600">Earn Money Deposit</div>
                  <div className="text-gray-800 font-medium">: {authorizationData.earnMoneyDeposit}</div>
                </div>
                
                <div className="flex">
                  <div className="w-40 text-gray-600">GST</div>
                  <div className="text-gray-800 font-medium">: {authorizationData.gst}</div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <div className="flex">
                  <div className="w-40 text-gray-600">PO Number</div>
                  <div className="text-gray-800 font-medium">: {authorizationData.poNumber}</div>
                </div>
                
                <div className="flex">
                  <div className="w-40 text-gray-600">Tender Fee</div>
                  <div className="text-gray-800 font-medium">: {authorizationData.tenderFee}</div>
                </div>
                
                <div className="flex">
                  <div className="w-40 text-gray-600">Tender Winner Name</div>
                  <div className="text-gray-800 font-medium">: {authorizationData.tenderWinnerName}</div>
                </div>
                
                <div className="flex">
                  <div className="w-40 text-gray-600">Tender Winner Status</div>
                  <div className="text-orange-500 font-medium">: {authorizationData.tenderWinnerStatus}</div>
                </div>
              </div>
            </div>

            {/* Total Refundable Amount */}
            <div className="flex pt-4 border-t border-gray-200">
              <div className="w-40 text-gray-600">Total Refundable Amount</div>
              <div className="text-gray-800 font-medium">: {authorizationData.totalRefundableAmount}</div>
            </div>

            {/* Approve Button */}
            <div className="flex justify-center mt-8">
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white px-8"
                onClick={handleApprove}
              >
                Approved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthorizationContent;
