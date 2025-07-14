import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RefundTable = ({ refundData }: { refundData: any[] }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === refundData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(refundData.map((item) => item.id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Refunds</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === refundData.length}
                    onChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Refund Status</TableHead>
                <TableHead>Bidder Name</TableHead>
                <TableHead>Refund Amount</TableHead>
                <TableHead>GST No</TableHead>
                <TableHead>PAN No</TableHead>
                <TableHead>Winning Status</TableHead>
                <TableHead>Tender Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refundData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-500 py-4"
                  >
                    No refund records available.
                  </TableCell>
                </TableRow>
              ) : (
                refundData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        style={{ color: "white",height:"30px",width:"100px", backgroundColor: "#194E7E",borderRadius:"8px" ,fontSize:"13px"}}
                      >
                        {item.status.toUpperCase() || "N/A"}
                      </button>
                    </TableCell>
                    <TableCell>{item.bidder_company_name || "N/A"}</TableCell>
                    <TableCell>{item.earnest_money_deposit || "N/A"}</TableCell>
                    <TableCell>{item.gst_number || "N/A"}</TableCell>
                    <TableCell>{item.pan_number || "N/A"}</TableCell>
                    <TableCell>  <button
                        style={{ color: "white",height:"30px",width:"100px", backgroundColor: "#FF8700",borderRadius:"8px" ,fontSize:"13px"}}
                      >
                        REJECTED
                      </button></TableCell>
                    <TableCell>{item.tender_name || "N/A"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RefundTable;
