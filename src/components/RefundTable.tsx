import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for refunds
const refundData = [
  {
    id: 1,
    registrationId: "142ANDKSD256AKDK",
    bidderName: "Deepak Sharma",
    refundAmount: "1",
    gstNumber: "22AAAAA0000A1Z5",
    panNumber: "APNPP2563C",
    winningStatus: "Loaded Tender",
    tenderName: "Road Construction",
    refundStatus: "Refund"
  },
  {
    id: 2,
    registrationId: "",
    bidderName: "Komal Sharma",
    refundAmount: "",
    gstNumber: "22AAAAA0000A1Z5",
    panNumber: "APNPP2563C",
    winningStatus: "Loaded Tender",
    tenderName: "Road Construction",
    refundStatus: ""
  }
];

const RefundTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === refundData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(refundData.map(item => item.id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Generate Refund</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="w-12 py-3">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedRows.length === refundData.length}
                    onChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-semibold">All</TableHead>
                <TableHead className="font-semibold">Refund Status</TableHead>
                <TableHead className="font-semibold">Registration ID</TableHead>
                <TableHead className="font-semibold">Bidder Name</TableHead>
                <TableHead className="font-semibold">Refund Amount</TableHead>
                <TableHead className="font-semibold">GST Number</TableHead>
                <TableHead className="font-semibold">PAN Number</TableHead>
                <TableHead className="font-semibold">Winning Status</TableHead>
                <TableHead className="font-semibold">Tender Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refundData.map((item) => (
                <TableRow key={item.id} className="border-b hover:bg-gray-50">
                  <TableCell className="py-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleSelectRow(item.id)}
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {item.refundStatus && (
                      <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {item.refundStatus}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{item.registrationId}</TableCell>
                  <TableCell>{item.bidderName}</TableCell>
                  <TableCell>{item.refundAmount}</TableCell>
                  <TableCell>{item.gstNumber}</TableCell>
                  <TableCell>{item.panNumber}</TableCell>
                  <TableCell>
                    <span className="text-red-500 font-medium">{item.winningStatus}</span>
                  </TableCell>
                  <TableCell>{item.tenderName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
          <div className="text-sm text-gray-700">
            Showing 1 to 10 entries
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" className="w-8 h-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              4
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundTable;
