import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import RefundTable from "./RefundTable";

// Mock data for tender refunds
const tenderData = [
  {
    id: 1,
    tenderName: "Road Construction",
    bidderName: "Deepak Sharma",
    city: "Mumbai",
    gstNo: "22AAAAA0000A1Z5",
    panNo: "AKRPT6789L",
    mobileNo: "+91 9999998532",
    email: "deepak_10@gmail.com",
    payment: "₹2"
  }
];

const RefundContent = () => {
  const [selectedTender, setSelectedTender] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRefundTable, setShowRefundTable] = useState(false);

  const filteredData = tenderData.filter(item =>
    item.bidderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.gstNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.panNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {showRefundTable ? (
        <RefundTable />
      ) : (
        <>
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tender Refund</h1>
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="hover:text-admin-blue-600 cursor-pointer">Home</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">Refund</span>
            </div>
          </div>

      {/* Tender Winner Declare Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tender Winner Declare</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Name/PO Number
            </label>
            <Select value={selectedTender} onValueChange={setSelectedTender}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Search by Name/PO Number" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="deepak-sharma">Deepak Sharma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Winner Display */}
          {selectedTender && (
            <div className="mt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-3">
                <span className="text-gray-700 font-medium">Winner of Tender - Deepak Sharma</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Road Construction Section */}
      {selectedTender && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Road Construction</h3>
            <div className="space-x-2">
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setShowRefundTable(true)}
              >
                Generate Refund
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700">Complete Refund Process</Button>
            </div>
          </div>
        </div>
      )}
    </>
    )}
    </div>
  );
};

export default RefundContent;
