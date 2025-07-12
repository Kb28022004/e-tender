import { Search, Bell, ChevronDown, Settings, Globe, Download, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { authAPI } from "@/services/api";

const UserTender = () => {
  const [selectedTender, setSelectedTender] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [tenderDetailsOpen, setTenderDetailsOpen] = useState(true);
  const [documentOpen, setDocumentOpen] = useState(false);
  const [bankDetailsOpen, setBankDetailsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // File upload states
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      // Call logout API
      console.log('Calling logout API...');
      const response = await authAPI.logout();
      console.log('Logout API response:', response);
      
      if (response.success) {
        console.log('Logout successful:', response.message);
      }
    } catch (error) {
      // Log error but don't prevent logout
      console.error('Logout API error:', error);
    } finally {
      // Always clear localStorage and navigate (for security)
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      // Navigate to login page
      navigate('/login');
    }
  };
  
  // Tender data with complete details
  const tenderData = {
    "road-construction": {
      name: "Road Construction",
      number: "6543567678098",
      details: {
        tenderName: "Road Construction Tender",
        openingDate: "10 May 2025",
        earnMoneyDeposit: "₹15000",
        gst: "0000",
        status: "Open",
        contactInfo: "+918877889966",
        closingDate: "30 May 2005",
        tenderFee: "₹130",
        poNumber: "6543567678098"
      }
    },
    "building-construction": {
      name: "Building Construction", 
      number: "7654321098765",
      details: {
        tenderName: "Building Construction Tender",
        openingDate: "15 May 2025",
        earnMoneyDeposit: "₹25000",
        gst: "0000",
        status: "Open",
        contactInfo: "+918877889966",
        closingDate: "15 June 2025",
        tenderFee: "₹200",
        poNumber: "7654321098765"
      }
    },
    "bridge-construction": {
      name: "Bridge Construction",
      number: "8765432109876",
      details: {
        tenderName: "Bridge Construction Tender",
        openingDate: "20 May 2025",
        earnMoneyDeposit: "₹50000",
        gst: "0000",
        status: "Open",
        contactInfo: "+918877889966",
        closingDate: "20 July 2025",
        tenderFee: "₹500",
        poNumber: "8765432109876"
      }
    },
    "highway-development": {
      name: "Highway Development",
      number: "9876543210987",
      details: {
        tenderName: "Highway Development Tender",
        openingDate: "25 May 2025",
        earnMoneyDeposit: "₹75000",
        gst: "0000",
        status: "Open",
        contactInfo: "+918877889966",
        closingDate: "25 August 2025",
        tenderFee: "₹750",
        poNumber: "9876543210987"
      }
    }
  };

  const handleTenderSelect = (value: string) => {
    setSelectedTender(value);
    setShowDetails(false); // Reset details view when new tender is selected
    setShowRegistration(false); // Reset registration view
  };

  const handleShowDetails = () => {
    setShowDetails(true);
    setShowRegistration(false); // Ensure registration is hidden
  };

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleFileUpload = (fieldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
    }
  };

  const triggerFileUpload = (fieldName: string) => {
    const fileInput = document.getElementById(`file-${fieldName}`) as HTMLInputElement;
    fileInput?.click();
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Blue Sidebar */}
      <div className="w-60 flex flex-col" style={{ backgroundColor: '#194E7E' }}>
        {/* Logo Section */}
        <div className="p-6 border-b border-opacity-30 border-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5" style={{ color: '#194E7E' }} />
            </div>
            <Logo width={120} height={21} className="h-5" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-white bg-white bg-opacity-20 rounded-lg p-3">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Tender</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - can be empty or have additional branding */}
            <div></div>

            <div className="flex items-center space-x-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-80 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
                </Button>
              </div>

              {/* User Profile */}
              <div className="relative">
                <div 
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-700 font-medium">Rahul Chandani</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">Rahul Chandani</div>
                      <div className="text-xs text-gray-500">User</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        // Add profile functionality here if needed
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Overlay to close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 p-8 bg-white">
          {!selectedTender ? (
            // Initial view - Tender selection
            <>
              {/* Page Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tender</h1>
                
                {/* Breadcrumb */}
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-gray-500 hover:text-gray-700">
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <span className="text-gray-900 font-medium">Tender</span>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Tender Details Card */}
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Tender Details</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Tender
                        </label>
                        <Select onValueChange={handleTenderSelect}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Tender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="road-construction">Road Construction</SelectItem>
                            <SelectItem value="building-construction">Building Construction</SelectItem>
                            <SelectItem value="bridge-construction">Bridge Construction</SelectItem>
                            <SelectItem value="highway-development">Highway Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Initial message */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-center">
                      Select a tender from the dropdown above to view details
                    </p>
                  </div>
                </div>
              </Card>
            </>
          ) : !showDetails ? (
            // Tender selected - Show tender with number
            <>
              {/* Page Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tender</h1>
                
                {/* Breadcrumb */}
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-gray-500 hover:text-gray-700">
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <span className="text-gray-900 font-medium">Tender</span>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Tender Details Card */}
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Tender Details</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Tender
                        </label>
                        <Select value={selectedTender} onValueChange={handleTenderSelect}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Tender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="road-construction">Road Construction</SelectItem>
                            <SelectItem value="building-construction">Building Construction</SelectItem>
                            <SelectItem value="bridge-construction">Bridge Construction</SelectItem>
                            <SelectItem value="highway-development">Highway Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Display selected tender with number */}
                      <div>
                        <Input
                          value={`${tenderData[selectedTender as keyof typeof tenderData].name}/${tenderData[selectedTender as keyof typeof tenderData].number}`}
                          readOnly
                          className="w-full bg-gray-50 text-gray-700 cursor-pointer"
                          onClick={handleShowDetails}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message to click for details */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-center">
                      Click on the tender number above to view detailed information
                    </p>
                  </div>
                </div>
              </Card>
            </>
                    ) : !showRegistration ? (
            // Detailed view - Show selected tender details (what user wants back)
            <>
              {/* Page Title with tender name */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {tenderData[selectedTender as keyof typeof tenderData].name}
                    </h1>
                    
                    {/* Breadcrumb */}
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/" className="text-gray-500 hover:text-gray-700">
                            Home
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <span className="text-gray-900 font-medium">Tender</span>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                  
                  {/* Download Details Button */}
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Details</span>
                  </Button>
                </div>
              </div>

              {/* Tender Information Card */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tender Information</h2>
                
                {/* Tender Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="w-40 text-gray-700">Tender Name</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-gray-900 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.tenderName}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="w-40 text-gray-700">Opening Date</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-gray-900 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.openingDate}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="w-40 text-gray-700">Earn Money Deposit</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-gray-900 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.earnMoneyDeposit}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="w-40 text-gray-700">GST</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-gray-900 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.gst}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="w-40 text-gray-700">Status</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-green-600 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="w-40 text-gray-700">Contact Information</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-gray-900 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.contactInfo}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="w-40 text-gray-700">Closing Date</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-gray-900 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.closingDate}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="w-40 text-gray-700">Tender Fee</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-gray-900 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.tenderFee}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="w-40 text-gray-700">P.O Number</span>
                      <span className="text-gray-500 mx-2">:</span>
                      <span className="text-gray-900 font-medium">
                        {tenderData[selectedTender as keyof typeof tenderData].details.poNumber}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedTender("");
                      setShowDetails(false);
                      setShowRegistration(false);
                    }}
                    className="px-6"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={handleShowRegistration}
                    className="px-6 bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Register
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            // Registration form view
            <>
              {/* Page Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tender</h1>
                
                {/* Breadcrumb */}
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-gray-500 hover:text-gray-700">
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <span className="text-gray-900 font-medium">Tender</span>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Registration Form */}
              <div className="space-y-6">
                {/* Tender Information Section */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Tender Information</h2>
                  
                  {/* Tender Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex">
                        <span className="w-32 text-gray-700">Tender Name</span>
                        <span className="text-gray-500 mx-2">:</span>
                        <span className="text-gray-900 font-medium">
                          {tenderData[selectedTender as keyof typeof tenderData].details.tenderName}
                        </span>
                      </div>
                      
                      <div className="flex">
                        <span className="w-32 text-gray-700">Opening Date</span>
                        <span className="text-gray-500 mx-2">:</span>
                        <span className="text-gray-900 font-medium">
                          {tenderData[selectedTender as keyof typeof tenderData].details.openingDate}
                        </span>
                      </div>
                      
                      <div className="flex">
                        <span className="w-32 text-gray-700">GST</span>
                        <span className="text-gray-500 mx-2">:</span>
                        <span className="text-gray-900 font-medium">
                          {tenderData[selectedTender as keyof typeof tenderData].details.gst}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex">
                        <span className="w-40 text-gray-700">Contact Information</span>
                        <span className="text-gray-500 mx-2">:</span>
                        <span className="text-gray-900 font-medium">
                          {tenderData[selectedTender as keyof typeof tenderData].details.contactInfo}
                        </span>
                      </div>
                      
                      <div className="flex">
                        <span className="w-40 text-gray-700">Closing Date</span>
                        <span className="text-gray-500 mx-2">:</span>
                        <span className="text-gray-900 font-medium">
                          {tenderData[selectedTender as keyof typeof tenderData].details.closingDate}
                        </span>
                      </div>
                      
                      <div className="flex">
                        <span className="w-40 text-gray-700">P.O Number</span>
                        <span className="text-gray-500 mx-2">:</span>
                        <span className="text-gray-900 font-medium">
                          {tenderData[selectedTender as keyof typeof tenderData].details.poNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Tender Details Collapsible Section */}
                <Card className="p-0">
                  <Collapsible open={tenderDetailsOpen} onOpenChange={setTenderDetailsOpen}>
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                      <span className="text-lg font-medium text-gray-900">Tender Details</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${tenderDetailsOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-6 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Bidder company Name
                            </label>
                            <Input placeholder="Enter Bidder company Name" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              city
                            </label>
                            <Input placeholder="Enter City Name" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Id
                            </label>
                            <Input placeholder="Enter Email ID" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Earn Money Deposit
                            </label>
                            <Input placeholder="Enter Earn Money Deposit Here" />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Address
                            </label>
                            <Input placeholder="Enter Address" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Pin Code
                            </label>
                            <Input placeholder="Enter Pin Code" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Contact Number
                            </label>
                            <Input placeholder="Enter contact Number" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tender Fee
                            </label>
                            <Input placeholder="Enter Tender Fee Here" />
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Document Section */}
                <Card className="p-0">
                  <Collapsible open={documentOpen} onOpenChange={setDocumentOpen}>
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                      <span className="text-lg font-medium text-gray-900">Document</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${documentOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-6 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* GST Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              GST Number
                            </label>
                            <Input placeholder="Enter GST Number" />
                          </div>

                          {/* Pan Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Pan Number
                            </label>
                            <Input placeholder="Enter Pan Number" />
                          </div>

                          {/* Company Registration Certificate */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Company Registration Certificate
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('company-registration')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['company-registration'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-company-registration"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('company-registration', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>

                          {/* Audited Balance Sheets */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Audited Balance Sheets (Last 2-3 years)
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('audited-balance')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['audited-balance'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-audited-balance"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('audited-balance', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>

                          {/* Turnover Certificate */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Turnover Certificate
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('turnover-certificate')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['turnover-certificate'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-turnover-certificate"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('turnover-certificate', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>

                          {/* Declaration Letter */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Declaration Letter
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('declaration-letter')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['declaration-letter'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-declaration-letter"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('declaration-letter', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Upload GST Registration */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Upload GST Registration
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('gst-registration')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['gst-registration'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-gst-registration"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('gst-registration', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>

                          {/* Upload Pan Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Upload Pan Number
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('pan-upload')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['pan-upload'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-pan-upload"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('pan-upload', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>

                          {/* Authorization Letter */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Authorization Letter
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('authorization-letter')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['authorization-letter'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-authorization-letter"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('authorization-letter', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>

                          {/* Income Tax Returns (ITR) */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Income Tax Returns (ITR)
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('itr')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['itr'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-itr"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('itr', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>

                          {/* Experience Documents */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Experience Documents (Past Work Orders)
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('experience-docs')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['experience-docs'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-experience-docs"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('experience-docs', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>

                          {/* Birth Certificate */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Birth Certificate
                            </label>
                            <div className="flex space-x-2">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1"
                                onClick={() => triggerFileUpload('birth-certificate')}
                              >
                                Choose File
                              </Button>
                              <span className="flex items-center text-gray-500 text-sm">
                                {uploadedFiles['birth-certificate'] || 'No File Chosen'}
                              </span>
                            </div>
                            <input
                              id="file-birth-certificate"
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileUpload('birth-certificate', e)}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Bank Details Section */}
                <Card className="p-0">
                  <Collapsible open={bankDetailsOpen} onOpenChange={setBankDetailsOpen}>
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                      <span className="text-lg font-medium text-gray-900">Bank Details</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${bankDetailsOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-6 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                          {/* Bank Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Bank Name
                            </label>
                            <Input placeholder="Enter Bank Name" />
                          </div>

                          {/* Account Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Account Name
                            </label>
                            <Input placeholder="Enter Account Number" />
                          </div>

                          {/* IFSC Code */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              IFSC Code
                            </label>
                            <Input placeholder="Enter IFSC Code" />
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          {/* Account Holder Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Account Holder Name
                            </label>
                            <Input placeholder="Enter Account Holder Name" />
                          </div>

                          {/* Confirm Account Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm Account Number
                            </label>
                            <Input placeholder="Enter Confirm Account Number" />
                          </div>

                          {/* Branch Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Branch Name
                            </label>
                            <Input placeholder="Enter Branch Name" />
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 py-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedTender("");
                      setShowDetails(false);
                      setShowRegistration(false);
                    }}
                    className="px-6"
                  >
                    Close
                  </Button>
                  <Button 
                    className="px-6 bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserTender; 