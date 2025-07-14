import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useGetAllPubliceTendersQuery } from "../features/tenderApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material"; // ✅ Make sure MUI is installed

type Tender = {
  id: number;
  title: string;
};

type Props = {
  getsingleTender: (args: { token: string | null; id: number }) => Promise<void>;
  setSelectedTender: (value: boolean) => void;
};

const UserTenderDropdown: React.FC<Props> = ({ getsingleTender, setSelectedTender }) => {
  const authToken = localStorage.getItem("authToken");
  const { data, isLoading, isError, error } = useGetAllPubliceTendersQuery({ token: authToken });

  const handleTenderSelect = async (id: string) => {
    const numericId = parseInt(id);
    try {
      await getsingleTender({ token: authToken, id: numericId });
      setSelectedTender(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError && error) {
      toast.error((error as any)?.data?.message || "Something Went Wrong");
    }
  }, [isError, error]);

  return (
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
  {isLoading ? (
    <div className="flex justify-center p-2">
      <CircularProgress size={20} />
    </div>
  ) : data?.data?.length > 0 ? (
    data.data.map((tender: Tender) => (
      <SelectItem key={tender.id} value={tender.id.toString()}>
        {tender.title}
      </SelectItem>
    ))
  ) : (
    <SelectItem disabled value="none">
      Nothing to select
    </SelectItem>
  )}
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
  );
};

export default UserTenderDropdown;
