
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Mock data for tender declarations
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
  },
  {
    id: 2,
    tenderName: "Road Construction",
    bidderName: "Komal Sharma",
    city: "Delhi",
    gstNo: "22AAAAA0000A1Z5",
    panNo: "BZMPD34560",
    mobileNo: "+91 9999998532",
    email: "deepak_10@gmail.com",
    payment: "₹2"
  },
  {
    id: 3,
    tenderName: "Road Construction",
    bidderName: "Nikhil Kumar",
    city: "Bengaluru",
    gstNo: "22AAAAA0000A1Z5",
    panNo: "CXVPH1234T",
    mobileNo: "+91 9999998532",
    email: "deepak_10@gmail.com",
    payment: "₹2"
  },
  {
    id: 4,
    tenderName: "Road Construction",
    bidderName: "Mohan Kumar",
    city: "Hyderabad",
    gstNo: "22AAAAA0000A1Z5",
    panNo: "DLWPC4321M",
    mobileNo: "+91 9999998532",
    email: "deepak_10@gmail.com",
    payment: "₹2"
  },
  {
    id: 5,
    tenderName: "Road Construction",
    bidderName: "Nikhil Kumar",
    city: "Bengaluru",
    gstNo: "22AAAAA0000A1Z5",
    panNo: "CXVPH1234T",
    mobileNo: "+91 9999998532",
    email: "deepak_10@gmail.com",
    payment: "₹2"
  }
];

const WinnerDeclarationContent = () => {
  const [selectedTender, setSelectedTender] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [declaredWinners, setDeclaredWinners] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<any>(null);
  const [message, setMessage] = useState("");

  const handleDeclareWinner = (item: any) => {
    setSelectedWinner(item);
    setDialogOpen(true);
  };

  const handleSubmitDeclaration = () => {
    if (selectedWinner) {
      setDeclaredWinners(prev => [...prev, selectedWinner.id]);
      setDialogOpen(false);
      setMessage("");
      setSelectedWinner(null);
    }
  };

  const filteredData = tenderData.filter(item =>
    item.bidderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.gstNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.panNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Winner Declaration</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="hover:text-admin-blue-600 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Winner Declaration</span>
        </div>
      </div>

      {/* Tender Winner Declare Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tender Winner Declare</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tender
            </label>
            <Select value={selectedTender} onValueChange={setSelectedTender}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select Tender" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="road-construction">Road Construction</SelectItem>
                <SelectItem value="bridge-construction">Bridge Construction</SelectItem>
                <SelectItem value="water-supply">Water Supply Project</SelectItem>
                <SelectItem value="electrical-work">Electrical Work</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Road Construction Display */}
          {selectedTender && (
            <div className="mt-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                <span className="text-gray-700 font-medium">Road Construction</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tender Winner Declaration Form */}
      {selectedTender && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tender Winner Declaration Form</h3>
          
          {/* Search Bar */}
          <div className="mb-6 relative">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Tender by bidder company name & pan no or GST number"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-admin-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead className="font-semibold">All</TableHead>
                  <TableHead className="font-semibold">Winner</TableHead>
                  <TableHead className="font-semibold">Tender Name</TableHead>
                  <TableHead className="font-semibold">Bidder Name</TableHead>
                  <TableHead className="font-semibold">City</TableHead>
                  <TableHead className="font-semibold">GST No</TableHead>
                  <TableHead className="font-semibold">Pan No</TableHead>
                  <TableHead className="font-semibold">Mobile No</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>All</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeclareWinner(item)}
                        disabled={declaredWinners.includes(item.id)}
                        className={`px-4 py-1 text-sm rounded-md border ${
                          declaredWinners.includes(item.id)
                            ? 'bg-green-100 text-green-700 border-green-300 cursor-not-allowed'
                            : 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200'
                        }`}
                        variant="outline"
                      >
                        {declaredWinners.includes(item.id) ? 'Winner Declared' : 'Declare Winner'}
                      </Button>
                    </TableCell>
                    <TableCell className="text-gray-600">{item.tenderName}</TableCell>
                    <TableCell className="text-gray-600">{item.bidderName}</TableCell>
                    <TableCell className="text-gray-600">{item.city}</TableCell>
                    <TableCell className="text-gray-600">{item.gstNo}</TableCell>
                    <TableCell className="text-gray-600">{item.panNo}</TableCell>
                    <TableCell className="text-gray-600">{item.mobileNo}</TableCell>
                    <TableCell className="text-gray-600">{item.email}</TableCell>
                    <TableCell className="text-gray-600">{item.payment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing 1 to 10 entries
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                &lt;
              </Button>
              <Button variant="default" size="sm" className="bg-admin-blue-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                2
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                3
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                4
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Winner Declaration Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Winner Declaration
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Breadcrumb in dialog */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900">Winner Declaration</span>
            </div>

            {/* Winner Name */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {selectedWinner?.bidderName}
              </h3>
            </div>

            {/* Message Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-2">
              <Input
                type="file"
                className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-4">
              <Button
                onClick={handleSubmitDeclaration}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2"
              >
                Submit
              </Button>
              <Button
                onClick={() => setDialogOpen(false)}
                variant="outline"
                className="border-gray-300 text-gray-700 px-6 py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WinnerDeclarationContent;
