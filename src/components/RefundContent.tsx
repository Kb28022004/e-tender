import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RefundTable from "./RefundTable";
import toast from "react-hot-toast";
import {
  useGenerateRefundMutation,
  useGetAllPubliceTendersQuery,
  useGetWinnerMutation,
} from "../features/tenderApi";

const RefundContent = () => {
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [selectedTenderInfo, setSelectedTenderInfo] = useState<any>(null);
  const [showRefundTable, setShowRefundTable] = useState(false);
  const [refundData, setRefundData] = useState<any[]>([]);

  const authToken = localStorage.getItem("authToken");

  const [generateRefund, { isLoading }] = useGenerateRefundMutation();
  const [getWinner] = useGetWinnerMutation();
  const { data: tenderData } = useGetAllPubliceTendersQuery({ token: authToken });

  const handleGetWinnerDetails = async (id: string) => {
    try {
      const res = await getWinner({ id, token: authToken }).unwrap();
      setSelectedTenderId(id);
      setSelectedTenderInfo(res?.data || {});
    } catch (error) {
      console.error("Error fetching winner:", error);
      toast.error("Failed to get winner details.");
    }
  };

  const handleGenerateRefund = async () => {
    if (!selectedTenderId) {
      toast.error("Please select a tender first.");
      return;
    }

    try {
      const res = await generateRefund({ id: selectedTenderId, token: authToken }).unwrap();
      const data = res?.data || [];

      if (Array.isArray(data) && data.length > 0) {
        setRefundData(data);
        toast.success("Refund generated successfully!");
        setShowRefundTable(true);
      } else {
        toast.success("No refunds to generate. All users may be winners.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate refund.");
    }
  };

  return (
    <div className="space-y-6">
      {showRefundTable ? (
        <RefundTable refundData={refundData} />
      ) : (
        <>
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tender Refund</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="hover:text-admin-blue-600 cursor-pointer">Home</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">Refund</span>
            </div>
          </div>

          {/* Tender Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tender Winner Declare</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Name/PO Number
                </label>
                <Select onValueChange={handleGetWinnerDetails}>
                  <SelectTrigger className="w-full max-w-md">
                    <SelectValue placeholder="Select a tender" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenderData?.data?.map((tender) => (
                      <SelectItem key={tender.id} value={tender.id.toString()}>
                        {tender.bidder_company_name || tender.title || `Tender #${tender.id}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTenderInfo && (
                <div className="mt-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-3">
                    <span className="text-gray-700 font-medium">
                      Winner of Tender -{" "}
                      {selectedTenderInfo?.bidder_company_name ||
                        selectedTenderInfo?.bidder_name ||
                        "N/A"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Refund Action */}
          {selectedTenderId && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedTenderInfo?.tenderName || "Tender Info"}
                </h3>
                <div className="space-x-2">
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={handleGenerateRefund}
                    disabled={isLoading}
                  >
                    {isLoading ? "Generating..." : "Generate Refund"}
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Complete Refund Process
                  </Button>
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
