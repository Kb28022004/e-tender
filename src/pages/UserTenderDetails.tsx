import BreadCrump from "@/components/BreadCrump";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "@mui/material";

type TenderDetails = {
  id: number;
  title?: string;
  open_date?: string;
  close_date?: string;
  deposit?: string;
  tender_fee?: string;
  gst_number?: string;
  contact_info?: string;
  status?: string;
  po?: string;
};

interface Props {
  singleTenderDetails: TenderDetails | null;
  setSelectedTender: (val: boolean) => void;
  handleShowRegistration: (id: number | undefined) => void;
  singleTenderLoading: boolean;
}

const UserTenderDetails: React.FC<Props> = ({
  singleTenderDetails,
  setSelectedTender,
  handleShowRegistration,
  singleTenderLoading,
}) => {
  return (
    <>
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <BreadCrump />

          {/* Download Details Button */}
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Details</span>
          </Button>
        </div>
      </div>

      {/* Tender Information Card */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Tender Information
        </h2>

        {/* Loading Spinner */}
        {singleTenderLoading && (
          <div className="mb-4">
            <CircularProgress size={50} sx={{ color: "black" }} />
          </div>
        )}

        {/* Tender Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex">
              <span className="w-40 text-gray-700">Tender Name</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-gray-900 font-medium">
                {singleTenderDetails?.title || "N/A"}
              </span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-700">Opening Date</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-gray-900 font-medium">
                {singleTenderDetails?.open_date || "N/A"}
              </span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-700">Earn Money Deposit</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-gray-900 font-medium">
                {singleTenderDetails?.deposit || "N/A"}
              </span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-700">GST</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-gray-900 font-medium">
                {singleTenderDetails?.gst_number || "N/A"}
              </span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-700">Status</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-green-600 font-medium">
                {singleTenderDetails?.status || "N/A"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex">
              <span className="w-40 text-gray-700">Contact Information</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-gray-900 font-medium">
                {singleTenderDetails?.contact_info || "N/A"}
              </span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-700">Closing Date</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-gray-900 font-medium">
                {singleTenderDetails?.close_date || "N/A"}
              </span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-700">Tender Fee</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-gray-900 font-medium">
                {singleTenderDetails?.tender_fee || "N/A"}
              </span>
            </div>

            <div className="flex">
              <span className="w-40 text-gray-700">P.O Number</span>
              <span className="text-gray-500 mx-2">:</span>
              <span className="text-gray-900 font-medium">
                {singleTenderDetails?.po || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            onClick={() => {
              setSelectedTender(false);
              handleShowRegistration(0); // optional fallback reset
            }}
            variant="outline"
            className="px-6"
          >
            Close
          </Button>
          <Button
            onClick={() => handleShowRegistration(singleTenderDetails?.id)}
            className="px-6 bg-teal-600 hover:bg-teal-700 text-white"
          >
            Register
          </Button>
        </div>
      </Card>
    </>
  );
};

export default UserTenderDetails;
